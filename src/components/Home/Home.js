import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { UserContext } from "../../App";
import BillTotal from "../BillTotal/BillTotal";

const Home = () => {
  const { value1, value2, value3, value4, value5, value6, value7 } =
    useContext(UserContext);
  const [items, setItems] = value1;
  const [inputValue, setInputValue] = value2;
  const [inputPrice, setInputPrice] = value4;
  const [person, setPerson] = value6;
  const [inputQuantity, setInputQuantity] = value7;
  console.log(items);

  const itemsObjectValid = () => {
    // inputPrice is truthy and is a number
    const priceValid = inputPrice && Number.parseFloat(inputPrice);

    // inputQuantity is truthy and is a number
    const quantityValid = inputQuantity && Number.parseFloat(inputQuantity);

    //inputValue is truthy and not only whitespace characters
    const titleValid =
      inputValue && inputValue.split("").find((char) => char != " ");
    return priceValid && quantityValid && titleValid;
  };

  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      price: inputPrice,
      quantity: inputQuantity,
      isSelected: false,
    };
    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue("");
    setInputPrice("");
    setInputQuantity("");
    // calculateTotal();
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
    // calculateTotal();
  };
  const quantityValid = (index) => {
    const newItems = [...items];
    const decreaseValid = newItems[index].quantity > 1;
    return decreaseValid;
  };
  const handleQuantityDecrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity--;

    setItems(newItems);
    // calculateTotal();
  };

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);
  };

  return (
    <div className="app-background">
      <h1>Grocery Billing App</h1>
      <div className="main-container">
        {person && (
          <div>
            Hey{" "}
            <strong>
              {person.name.first}! from {person.location.city}{" "}
            </strong>
            Phone no: {person.phone} <br />
            Add your grocery items
          </div>
        )}
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="Add an item"
            type="text"
            required
          />{" "}
          <br />
          <input
            value={inputPrice}
            onChange={(event) => setInputPrice(event.target.value)}
            className="add-item-input"
            placeholder="Add price"
            type="number"
            required
          />
          <input
            value={inputQuantity}
            onChange={(event) => setInputQuantity(event.target.value)}
            className="add-item-input"
            placeholder="Quantity"
            type="number"
            required
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => {
              if (itemsObjectValid()) {
                handleAddButtonClick();
              }
            }}
          />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div key={index} className="item-container">
              <div className="item-name" onClick={() => toggleComplete(index)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => {
                      if (quantityValid(index)) {
                        handleQuantityDecrease(index);
                      }
                    }}
                  />
                </button>
                <span>{item.quantity}</span>
                <button>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
              </div>
              <div className="price">
                <span>{item.price * item.quantity}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <BillTotal />
        </div>
      </div>
      <Link to="/printInvoice">
        <button>Go to invoice!</button>
      </Link>
    </div>
  );
};

export default Home;
