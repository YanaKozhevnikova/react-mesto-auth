import React from "react";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessful, setSuccessful] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      api.checkToken(token)
      .then(res => res.data)
      .then(data => {
        if (data) {
          setLoggedIn(true);
          setEmail(data.email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [])


 function getUserInfo() {
    api.getUserInfo()
    .then((userInfo) => {
      setCurrentUser(userInfo);
    })
    .catch(err => console.log(err))
  }

  //добавление карточек и их функции
  function getCards() {
    api.getInitialCards()
    .then((cards) => {
      setCards(cards);
    })
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.postCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch(err => console.log(err));
  }

  //открытие и закрытие попапов
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setTooltipOpen(false);

    setSelectedCard({name: '', link: ''});
  }

  //обновление данных пользователя
  function handleUpdateUser(info) {
    api.setUserInfo(info)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
    .then(avatar => {
      setCurrentUser(avatar);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  function handleRegister(email, password) {
    api.register(email, password)
    .then(res => {
      if (res.data) {
        setSuccessful(true);
        setTooltipOpen(true);
        history.push('/signin');
      } else {
        setSuccessful(false);
        setTooltipOpen(true);
      }
    })
    .catch((err) => {
      console.log(err)
      setSuccessful(false);
      setTooltipOpen(true);
    })
  }

  function handleLogin(email, password) {
    api.login(email, password)
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    })
    .then(data => {
      if (data.token) {
        setLoggedIn(true);
        setEmail(email)
        history.push('/');
      }
    })
    .catch((err) => {
      console.log(err);
      setSuccessful(false);
      setTooltipOpen(true);
    })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header
          loggedIn={loggedIn}
          email={email}
          onSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            getCards={getCards}
            getUserInfo={getUserInfo}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/signin">
            {loggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
          </Route>
          <Route path="/signup">
            {loggedIn ? <Redirect to="/" /> : <Register onRegister={handleRegister} />}
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
      </div>
      <InfoTooltip
        isOpen={isTooltipOpen}
        isSuccessful={isSuccessful}
        onClose={closeAllPopups}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;

