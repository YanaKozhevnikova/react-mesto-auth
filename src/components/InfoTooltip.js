import successImagePath from "../images/success.svg";
import errorImagePath from "../images/error.svg";

function InfoTooltip({isOpen, isSuccessful, onClose}) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        <img src={isSuccessful ? successImagePath : errorImagePath} className="popup__status-image" alt={isSuccessful ? 'Удача' : 'Ошибка'}></img>
        <h2 className="popup__heading popup__heading_type_tooltip">{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
