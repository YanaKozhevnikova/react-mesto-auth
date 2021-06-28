function Card(props) {
  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
    <li className="element">
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button type="button" className="element__delete-button" aria-label="Удалить"></button>
      <div className="element__content">
        <h2 className="element__heading">{props.card.name}</h2>
        <div className="element__like">
          <button type="button" className="element__like-button" aria-label="Нравится"></button>
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
