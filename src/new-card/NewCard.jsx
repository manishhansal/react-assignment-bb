import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-credit-cards-2";
import "react-credit-cards-2/es/styles-compiled.css";
import { createCardAction } from "_store";
import "./index.css";

const NewCard = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const { createCardResponse } = useSelector(
    (state) => state.createCardResponse
  );

  const dispatch = useDispatch();
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleCreateCard = (event) => {
    event.preventDefault();
    return dispatch(createCardAction.createCard(state));
  };
  return (
    <>
      <h1 style={{textAlign:"center"}}>Add Card</h1>
      <div>
        <Card
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <br />
        <div className="form-div">
          <form className="form" onSubmit={handleCreateCard}>
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              type="text"
              name="name"
              placeholder="Card Holder Name"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              type="tel"
              name="expiry"
              placeholder="Expiry date eg.11/11"
              pattern="\d\d/\d\d"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              pattern="\d{3,4}"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input type="submit" value="Submit"></input>
          </form>
        </div>
        {createCardResponse.loading && (
          <div className="spinner-border spinner-border-sm"></div>
        )}
        {createCardResponse.error && (
          <div className="text-danger">
            Error creating card: {createCardResponse.error.message}
          </div>
        )}
      </div>
    </>
  );
};

export { NewCard };
