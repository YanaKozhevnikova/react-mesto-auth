import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      {isOwn && (
        <button type="button" className="element__delete-button" onClick={handleDeleteClick} aria-label="Удалить"></button>
      )}
      <div className="element__content">
        <h2 className="element__heading">{card.name}</h2>
        <div className="element__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится"></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
