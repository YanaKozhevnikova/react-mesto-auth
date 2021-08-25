import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
    e.target.reset();
  }

  function handleClose() {
    onClose();
    avatarRef.current.value = '';
  }



  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submit="Сохранить"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      >
        <input ref={avatarRef} type="url" required placeholder="Ссылка на фото" name="avatar" id="avatar-input" className="form__input form__input_type_avatar" />
        <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
