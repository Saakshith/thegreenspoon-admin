import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import Modal from "./Modal/Modal";
import logoDark from "../green_spoon_logo.png";
import { db } from "../firebase";
import { collection, getDocs, setDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import "./menu.css";
import { FaTrash, FaPen, FaPlus, FaPencilAlt } from 'react-icons/fa';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const menuItemsRef = collection(db, "menu-items");

  useEffect(() => {
    const getMenuItems = async () => {
      const data = await getDocs(menuItemsRef);
      setMenuItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getMenuItems();
  }, []);

  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [id, setId] = useState("");
  const [cusine, setCusine] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [calories, setCalories] = useState(null);
  const [restrictions, setRestrictions] = useState(null);

  const toggleAddModal = () => {
    setAddModal(!addModal);
    clearForm();
  };

  const toggleUpdateModal = (id) => {
    const selectedItem = menuItems.find((item) => item.id === id);
    setId(id);
    setCusine(selectedItem.cusine);
    setImageURL(selectedItem.image);
    setName(selectedItem.name);
    setPrice(selectedItem.price);
    setDescription(selectedItem.description);
    setCalories(selectedItem.calories);
    setRestrictions(selectedItem.restrictions);
    setUpdateModal(!updateModal);
  };

  const clearForm = () => {
    setCusine(null);
    setImageURL(null);
    setName(null);
    setPrice(null);
    setDescription(null);
    setCalories(null);
    setRestrictions(null);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "menu-items"), {
        calories,
        cusine,
        description,
        image: imageURL,
        name,
        price,
        restrictions
      });

      window.alert("Item has been added");
      toggleAddModal();
      clearForm();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateItem = async (id, e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "menu-items", id), {
        calories,
        cusine,
        description,
        image: imageURL,
        name,
        price,
        restrictions
      });

      window.alert("Item has been updated");
      toggleUpdateModal();
      clearForm();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteItem = async (id, e) => {
    e.preventDefault();
    try {
      await deleteDoc(doc(db, "menu-items", id));
      window.alert("Item has been deleted");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar logo={logoDark} color="black" navLinkColor="black" />
      <h2 className='page-title'>Menu Page</h2>
      <div className="menu-page-main">
        <div className="menu-cards">
          <div className="menu-card menu-card-add">
            <button className="add-btn" onClick={toggleAddModal}><FaPlus /></button>
          </div>

          {addModal && (
            <Modal
              modalTitle="Add Item"
              toggleModal={toggleAddModal}
              handleItem={handleAddItem}
              calories={calories}
              cusine={cusine}
              description={description}
              imageURL={imageURL}
              name={name}
              price={price}
              restrictions={restrictions}
              setCalories={setCalories}
              setCusine={setCusine}
              setDescription={setDescription}
              setImageURL={setImageURL}
              setName={setName}
              setPrice={setPrice}
              setRestrictions={setRestrictions}
            />
          )}

          {updateModal && (
            <Modal
              modalTitle="Update Item"
              toggleModal={toggleUpdateModal}
              handleItem={(e) => handleUpdateItem(id, e)}
              calories={calories}
              cusine={cusine}
              description={description}
              imageURL={imageURL}
              name={name}
              price={price}
              restrictions={restrictions}
              setCalories={setCalories}
              setCusine={setCusine}
              setDescription={setDescription}
              setImageURL={setImageURL}
              setName={setName}
              setPrice={setPrice}
              setRestrictions={setRestrictions}
            />
          )}

          {menuItems.map((item, index) => (
            <div className="menu-card" key={item.id}>
              <h1 className="cusine-tag">{item.cusine}</h1>
              <div className="food-image-container" style={{ backgroundImage: `url(${item.image})` }}></div>
              <div className="menu-text">
                <div className="menu-text-top">
                  <div className="menu-text-top-heading-price">
                    <h3 className="menu-text-top-heading" key={item.name}>{item.name}</h3>
                    <p className="menu-text-top-price">${item.price}</p>
                  </div>
                  <p className="food-description">{item.description}</p>
                </div>
                <div className="menu-text-bottom">
                  <p className="calories">{item.calories} CAL</p>
                  <p className="dietary-restrictions">{item.restrictions}</p>
                </div>
              </div>
              <div className="menu-card-actions">
                <button className="delete-btn" onClick={(e) => handleDeleteItem(item.id, e)}><FaTrash /></button>
                <button className="edit-btn" onClick={() => toggleUpdateModal(item.id)}><FaPencilAlt /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
