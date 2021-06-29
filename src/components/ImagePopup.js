function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card.link.length > 0 && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <h2 className="popup__image-heading">{props.card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;
