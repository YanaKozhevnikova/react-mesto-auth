import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
    name="profile"
    title="Редактировать профиль"
    submit="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    >
      <input value={name} onChange={handleNameChange} type="text" required minLength="2" maxLength="40" placeholder="Имя" name="name" id="name-input" className="form__input form__input_type_name" />
      <span className="form__input-error name-input-error"></span>
      <input value={description} onChange={handleDescriptionChange} type="text" required minLength="2" maxLength="200" placeholder="О себе" name="about" id="about-input" className="form__input form__input_type_about" />
      <span className="form__input-error about-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
