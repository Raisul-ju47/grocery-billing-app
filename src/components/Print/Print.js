import React, { useRef, useContext } from "react";
import "./Print.css";
import { UserContext } from "../../App";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router-dom";

const Print = () => {
  
  const { value1, value2, value3, value4, value5, value6 } =
    useContext(UserContext);
  const [items, setItems] = value1;
  const [inputValue, setInputValue] = value2;
  const [totalItemCount, setTotalItemCount] = value3;
  const [inputPrice, setInputPrice] = value4;
  const [totalPriceCount, setTotalPriceCount] = value5;
  const [person, setPerson] = value6;
  console.log(person);
  const history = useHistory();
  const goBack = () => {
      history.push("home");
  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="print-background">
      <div className="print-container" ref={componentRef}>
        <h1>Invoice</h1>
        <h2>Eastern Grocery</h2>
        <h3>Mirpur-14, Dhaka-1206</h3>
        <p>
          Bill To: {person.name.title} {person.name.first} {person.name.last}
        </p>
        <p>{person.gender}</p>
        <p>{person.email}</p>
        <p>{person.cell}</p>
        <div className="item-heading-container">
          <p>Item Name</p>
          <p>Quantity</p>
          <p>Amount</p>
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name">{item.itemName}</div>
              <div className="item-name">{item.quantity}</div>
              <div className="item-name">{item.price * item.quantity}</div>
            </div>
          ))}
        </div>
        <h1>Total: {totalPriceCount}</h1>
      </div>
      <button onClick={handlePrint}>Print Invoice</button>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default Print;
