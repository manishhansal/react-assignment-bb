import React from "react";
import Card from "react-credit-cards-2";
import "react-credit-cards-2/es/styles-compiled.css";

const CardComponent = ({ cardDetails }) => {
  const formatDate = (date) => {
    const month = date?.split("/")[0];
    const year = date?.split("/")[1];
    // if month is 1 digit, add a 0 to the front
    const monthFormatted = month?.length === 1 ? `0${month}` : month;
    return `${monthFormatted}/${year}`;
  };

  return (
    <>
      {cardDetails && (
        <Card
          name={cardDetails?.cardHolder}
          number={cardDetails?.cardNumber}
          expiry={formatDate(cardDetails?.cardExpiration)}
          cvc={cardDetails?.cardCvc}
          focused={cardDetails?.cardFocus}
        />
      )}
    </>
  );
};

export { CardComponent };
