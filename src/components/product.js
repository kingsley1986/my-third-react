import React from "react";
import { Card } from "react-bootstrap";

const ProductCard = (props) => {
  return (
    <>
      <Card style={{ width: "inherit" }}>
        <Card.Img variant="top" src={props.imgSrc} />
        {/* <Card.Body>
          <Card.Title>Las Vegas, NV</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body> */}
      </Card>
    </>
  );
};
export default ProductCard;
