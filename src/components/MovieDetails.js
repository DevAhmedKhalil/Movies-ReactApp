import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY; // To Easy Change When Determine

  // Fetch movie details
  const getMovieDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ar-EG`
      );
      setMovie(res.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container className="mt-4">
      {/* Showing CardDetails Logic */}
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
          <h3>جار تحميل تفاصيل الفيلم...</h3>
        </Row>
      ) : movie ? (
        <Row>
          {/* Card Image */}
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </Card>
          </Col>

          {/* Card Details */}
          <Col md={8} className="text-center">
            <h1 className="mb-5 main-color">{movie.title}</h1>
            <p>
              <div>
                <strong>تاريخ الإصدار</strong>
              </div>
              <span>{movie.release_date}</span>
            </p>
            <p>
              <div>
                <strong>التقييم</strong>
              </div>
              <span>{movie.vote_average} / 10</span>
            </p>
            <p>
              <div>
                <strong>عدد المقيمين</strong>
              </div>
              <span>{movie.vote_count}</span>
            </p>
            <p>
              <div>
                <strong>المدة الزمنية</strong>
              </div>
              <span>{movie.runtime} دقيقة</span>
            </p>
            <p>
              <div>
                <strong>اللغة الأصلية</strong>
              </div>
              <span>{movie.original_language}</span>
            </p>
            <p>
              <div>
                <strong>الوصف</strong>
              </div>
              <span>{movie.overview || "لا يوجد وصف للفيلم."}</span>
            </p>
          </Col>

          {/* Buttons */}
          <Col md="4">
            <div className="d-flex justify-content-around my-5">
              <button className="btn-main-color" onClick={handleBackToHome}>
                للصفحه الرئيسيه
              </button>
              {movie.homepage ? (
                <a href={movie.homepage}>
                  <button className="btn-main-color">مشاهده الفيلم</button>
                </a>
              ) : null}
            </div>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <h3 className="text-danger">لم يتم العثور على تفاصيل الفيلم</h3>
        </Row>
      )}
    </Container>
  );
};

export default MovieDetails;
