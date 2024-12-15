import React from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import CardMovie from "./CardMovie";

const MoviesList = ({ movies, loading }) => {
  return (
    <Row className="mt-3">
      {loading ? (
        <Col className="text-center mt-5">
          <Spinner animation="border" variant="success" />
          <h3>جارٍ تحميل الأفلام...</h3>
        </Col>
      ) : movies.length > 0 ? (
        movies.map((movie) => {
          return <CardMovie key={movie.id} movie={movie} />;
        })
      ) : (
        <Col className="text-center mt-5">
          <Card className="no-movies-card">
            <Card.Body>
              <h3 className="text-danger">لا توجد أفلام حالياً</h3>
              <p className="text-muted">
                نعتذر، ولكن لم نتمكن من العثور على أي أفلام في الوقت الحالي.
                يرجى المحاولة لاحقًا.
              </p>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default MoviesList;