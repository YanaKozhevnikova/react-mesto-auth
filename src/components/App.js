import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

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
    setSelectedCard(false);
  }

  return (
    <div className="page__content">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        submit="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
            <input type="text" required minLength="2" maxLength="40" placeholder="Имя" name="name" id="name-input" className="form__input form__input_type_name" />
            <span className="form__input-error name-input-error"></span>
            <input type="text" required minLength="2" maxLength="200" placeholder="О себе" name="about" id="about-input" className="form__input form__input_type_about" />
            <span className="form__input-error about-input-error"></span>
          </>
        )}
      />
      <PopupWithForm
        name="place"
        title="Новое место"
        submit="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
            <input type="text" required minLength="2" maxLength="30" placeholder="Название" name="placename" id="place-name-input" className="form__input form__input_type_place-name" />
            <span className="form__input-error place-name-input-error"></span>
            <input type="url" required placeholder="Ссылка на картинку" name="link" id="place-link-input" className="form__input form__input_type_place-link" />
            <span className="form__input-error place-link-input-error"></span>
          </>
        )}
      />
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        submit="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={(
          <>
            <input type="url" required placeholder="Ссылка на фото" name="avatar" id="avatar-input" className="form__input form__input_type_avatar" />
            <span className="form__input-error avatar-input-error"></span>
          </>
        )}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;

