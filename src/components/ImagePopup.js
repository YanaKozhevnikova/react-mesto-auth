function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card.link.length > 0 && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__image-heading">{card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;
