import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";

import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);

  const apiKey = process.env.REACT_APP_API_KEY; // To Easy Change When Determine

  // Function to fetch all movies (popular)
  const fetchAllMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ar-EG`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch movies for a specific page
  const fetchMoviesForPage = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ar-EG&page=${pageNumber}`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching page data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to search movies
  const searchMovies = async (searchWord) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchWord}`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to call fetchAllMovies when the component mounts
  useEffect(() => {
    fetchAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle search
  const search = (searchWord) => {
    if (searchWord === "") {
      fetchAllMovies();
    } else {
      searchMovies(searchWord);
    }
  };

  return (
    <div className="font color-body">
      <NavBar search={search} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesList
                  movies={movies}
                  loading={loading}
                  getPage={fetchMoviesForPage}
                  pageCount={pageCount}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
