import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardComponent } from "_components";
import { userActions } from "_store";

const StackOfCards = () => {
  const dispatch = useDispatch();
  const { cards } = useSelector((x) => x.cards);

  useEffect(() => {
    dispatch(userActions.getAll());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Stack of Cards</h1>
      {cards.results && (
        <ul>
          {cards.results?.map((card) => (
            <li key={card.id}>
              {card.cardHolder} {card.cardNumber}
            </li>
          ))}
        </ul>
      )}
      {cards.loading && (
        <div className="spinner-border spinner-border-sm"></div>
      )}
      {cards.error && (
        <div className="text-danger">
          Error loading users: {cards.error.message}
        </div>
      )}
      <CardComponent />
    </div>
  );
};

export { StackOfCards };
