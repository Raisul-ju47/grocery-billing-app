import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import './Home.css';
import { UserContext } from "../../App";

const Home = () => {
  const { value1, value2, value3, value4, value5, value6 } =
    useContext(UserContext);
  const [items, setItems] = value1;
  const [inputValue, setInputValue] = value2;
  const [totalItemCount, setTotalItemCount] = value3;
  const [inputPrice, setInputPrice] = value4;
  const [totalPriceCount, setTotalPriceCount] = value5;
  const [person, setPerson] = value6;

  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      price: inputPrice,
      quantity: 0,
      isSelected: false,
    };
    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue("");
    setInputPrice("");
    calculateTotal();
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity--;

    setItems(newItems);
    calculateTotal();
  };

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);
  };
  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    const totalPriceCount = items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
    setTotalPriceCount(totalPriceCount);
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
          />{" "}
          <br />
          <input
            value={inputPrice}
            onChange={(event) => setInputPrice(event.target.value)}
            className="add-item-input"
            placeholder="Add price"
            type="number"
          /> <br />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => handleAddButtonClick()}
          />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
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
                    onClick={() => handleQuantityDecrease(index)}
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
          Total Items: {totalItemCount} Price: {totalPriceCount}
        </div>
      </div>
      <Link to="/printInvoice">
        <button>Go to invoice!</button>
      </Link>
    </div>
  );
};

export default Home;
