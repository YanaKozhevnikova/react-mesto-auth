function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
        <h2 className="popup__heading">{props.title}</h2>
        <form name={props.name} className="form">
          {props.children}
          <button type="submit" className="form__save-button">{props.submit}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
