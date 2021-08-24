import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    props.getCards();
  }, [])

  React.useEffect(() => {
    props.getUserInfo();
  }, [])

  return (
    <main>
      <section className="profile">
        <div className="profile__picture-container">
          <img src={currentUser.avatar} alt="Фото профиля" className="profile__picture" />
          <button type="button" className="profile__button profile__button_type_edit-picture" aria-label="Изменить фото" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" className="profile__button profile__button_type_edit" aria-label="Изменить" onClick={props.onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__button profile__button_type_add" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>
      <ul className="elements">
        {props.cards.map((card) => (
          <Card key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </ul>
    </main>
  )
}

export default Main;
