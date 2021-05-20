import React, { useRef, useContext } from "react";
import { UserContext } from "../../App";

const BillTotal = () => {
  const { value1 } = useContext(UserContext);
  const [items, setItems] = value1;

  

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h1 style={{ color: "white", fontSize: "2rem" }}>
        Total Quantity: 
        {
            items.reduce((acc, item) => {
                return item.isSelected ?
                acc :
                Number.parseFloat(item.quantity) + acc;
            }, 0)
        }
        </h1>
        <h1 style={{ color: "white", fontSize: "2rem", paddingLeft: '20px' }}>
        Total price: 
        {
            items.reduce((acc, item) => {
                return item.isSelected ?
                acc :
                Number.parseFloat(item.quantity) * Number.parseFloat(item.price) + acc;
            }, 0)
        }
      </h1>
    </div>
  );
};

export default BillTotal;
