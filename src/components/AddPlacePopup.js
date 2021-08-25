import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('')
  }, [isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      submit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
        <input value={name} onChange={handleNameChange} type="text" required minLength="2" maxLength="30" placeholder="Название" name="placename" id="place-name-input" className="form__input form__input_type_place-name" />
        <span className="form__input-error place-name-input-error"></span>
        <input value={link} onChange={handleLinkChange} type="url" required placeholder="Ссылка на картинку" name="link" id="place-link-input" className="form__input form__input_type_place-link" />
        <span className="form__input-error place-link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
