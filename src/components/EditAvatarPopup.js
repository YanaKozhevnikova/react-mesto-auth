import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
    e.target.reset();
  }

  function handleClose() {
    props.onClose();
    avatarRef.current.value = '';
  }



  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submit="Сохранить"
      isOpen={props.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      >
        <input ref={avatarRef} type="url" required placeholder="Ссылка на фото" name="avatar" id="avatar-input" className="form__input form__input_type_avatar" />
        <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
