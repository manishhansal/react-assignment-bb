import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardComponent } from "_components";
import { userActions } from "_store";
import "./index.css";

const StackOfCards = () => {
  const dispatch = useDispatch();
  const { cards } = useSelector((x) => x.cards);

  useEffect(() => {
    dispatch(userActions.getAll());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Stack of Cards</h1>
      {cards.results && (
        <div className="all-cards-container">
          {cards.results?.map((card) => (
            <div key={card.id}>
              <CardComponent cardDetails={card} />
            </div>
          ))}
        </div>
      )}
      {cards.loading && (
        <div className="spinner-border spinner-border-sm"></div>
      )}
      {cards.error && (
        <div className="text-danger">
          Error loading cards: {cards.error.message}
        </div>
      )}
    </div>
  );
};

export { StackOfCards };
