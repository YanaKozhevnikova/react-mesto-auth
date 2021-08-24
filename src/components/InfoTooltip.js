import successImagePath from "../images/success.svg";
import errorImagePath from "../images/error.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
        <img src={props.isSuccessful ? successImagePath : errorImagePath} className="popup__status-image"></img>
        <h2 className="popup__heading popup__heading_type_tooltip">{props.isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
