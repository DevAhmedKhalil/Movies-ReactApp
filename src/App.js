import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  // GET all movies
  const getAllMovies = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=e5a2630c75ead69da5ef2268731012c1&language=ar-EG"
      );
      setMovies(res.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after the data is fetched
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="font color-body">
      <NavBar />
      <Container>
        <MoviesList movies={movies} loading={loading} />
      </Container>
    </div>
  );
}

export default App;
