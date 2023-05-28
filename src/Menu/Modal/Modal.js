import React from 'react';
import './modal.css';

const Modal = ({
  modalTitle,
  toggleModal,
  handleItem,
  calories,
  cusine,
  description,
  imageURL,
  name,
  price,
  restrictions,
  setCalories,
  setCusine,
  setDescription,
  setImageURL,
  setName,
  setPrice,
  setRestrictions
}) => {
  const clearForm = () => {
    setCusine('');
    setImageURL('');
    setName('');
    setPrice('');
    setDescription('');
    setCalories('');
    setRestrictions('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleItem(e);
    clearForm();
  };

  return (
    <div className="modal">
      <div className="overlay">
        <div className="modal-content">
          <h2>{modalTitle}</h2>
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-form-input-parent">
              <div className="modal-form-input">
                <label htmlFor="">Cusine</label>
                <input
                  type="text"
                  className="modal-form-cusine"
                  required
                  value={cusine}
                  onChange={(e) => setCusine(e.target.value)}
                />
              </div>
              <div className="modal-form-input">
                <label htmlFor="">Image Url</label>
                <input
                  type="text"
                  className="modal-form-img-url"
                  required
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-form-input-parent">
              <div className="modal-form-input">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="modal-form-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="modal-form-input">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  className="modal-form-price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-form-input">
              <label htmlFor="">Description</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-form-input-parent">
              <div className="modal-form-input">
                <label htmlFor="">Calories</label>
                <input
                  type="number"
                  className="modal-form-calories"
                  required
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
              <div className="modal-form-input">
                <label htmlFor="">Restrictions</label>
                <input
                  type="text"
                  className="modal-form-restrictions"
                  value={restrictions}
                  onChange={(e) => setRestrictions(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-form-input">
              <button type="submit" className="modal-form-submit">
                {modalTitle}
              </button>
            </div>
          </form>
          <button className="close-modal" onClick={() => { toggleModal(); clearForm(); }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );    
};

export default Modal;
