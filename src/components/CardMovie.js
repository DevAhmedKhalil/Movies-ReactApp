import React from "react";
import { Col } from "react-bootstrap";

const CardMovie = ({ movie }) => {
  return (
    <Col xs="6" sm="6" md="4" lg="3" className="my-1">
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          className="card__image"
          alt="img"
        />
        <div className="card__overlay">
          <div className="overlay__text text-center w-100 p-2">
            <p>إسم الفيلم: {movie.title}</p>
            <p>تاريخ الإصدار: {movie.release_date}</p>
            <p>عدد المقيمين: {movie.vote_count}</p>
            <p>التقييم: {movie.vote_average}</p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CardMovie;
