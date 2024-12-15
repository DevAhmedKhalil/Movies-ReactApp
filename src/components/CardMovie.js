import React from "react";
import { Col } from "react-bootstrap";

const CardMovie = () => {
  return (
    <Col xs="6" sm="6" md="4" lg="3" className="my-1">
      <div className="card">
        <img src="coffee.jpg" className="card__image" alt="img" />
        <div className="card__overlay">
          <div className="overlay__text text-center w-100 p-2">
            <p>إسم الفيلم : Coffee Corner</p>
            <p>تاريخ الإصدار : 1995-3-2</p>
            <p>النوع : إنيميشن</p>
            <p>التقييم : 8.5</p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CardMovie;
