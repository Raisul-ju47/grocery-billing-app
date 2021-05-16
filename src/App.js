import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createContext } from "react";
import Home from "./components/Home/Home";
import Print from "./components/Print/Print";
export const UserContext = createContext();
function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [inputPrice, setInputPrice] = useState("");
  const [totalPriceCount, setTotalPriceCount] = useState(0);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.randomuser.me/");
      const data = await response.json();
      const [item] = data.results;
      console.log(item);
      setPerson(item);
    }
    fetchData();
  }, []);
  return (
    <UserContext.Provider
      value={{
        value1: [items, setItems],
        value2: [inputValue, setInputValue],
        value3: [totalItemCount, setTotalItemCount],
        value4: [inputPrice, setInputPrice],
        value5: [totalPriceCount, setTotalPriceCount],
        value6: [person, setPerson],
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/printInvoice">
            <Print />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
