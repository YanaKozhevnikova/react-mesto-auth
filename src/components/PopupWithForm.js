function PopupWithForm({name, title, submit, isOpen, onClose, onSubmit, children}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        <h2 className="popup__heading">{title}</h2>
        <form name={name} className="form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="form__save-button">{submit}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
