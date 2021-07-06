import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_active'}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      {isOwn && (
        <button type="button" className="element__delete-button" onClick={handleDeleteClick} aria-label="Удалить"></button>
      )}
      <div className="element__content">
        <h2 className="element__heading">{props.card.name}</h2>
        <div className="element__like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится"></button>
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
