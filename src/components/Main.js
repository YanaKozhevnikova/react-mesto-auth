import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setuserName] = React.useState();
  const [userDescription, setuserDescription] = React.useState();
  const [userAvatar, setuserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then((userInfo) => {
      setuserName(userInfo.name);
      setuserDescription(userInfo.about);
      setuserAvatar(userInfo.avatar);
    })
    .catch(err => console.log(err))
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
    .then((cards) => {
      setCards(cards);
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <main>
      <section className="profile">
        <div className="profile__picture-container">
          <img src={userAvatar} alt="Фото профиля" className="profile__picture" />
          <button type="button" className="profile__button profile__button_type_edit-picture" aria-label="Изменить фото" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" className="profile__button profile__button_type_edit" aria-label="Изменить" onClick={props.onEditProfile}></button>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button type="button" className="profile__button profile__button_type_add" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>
      <ul className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </ul>
    </main>
  )
}

export default Main;
