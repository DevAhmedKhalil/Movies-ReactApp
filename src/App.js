import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);

  //@ Function to fetch all movies (top_rated movies)
  const getAllMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=e5a2630c75ead69da5ef2268731012c1&language=ar-EG"
        // "https://api.themoviedb.org/3/movie/popular?api_key=e5a2630c75ead69da5ef2268731012c1&language=ar-EG"
      );
      // console.log(res.data);
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  //@ GET Current Page
  const getPage = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=e5a2630c75ead69da5ef2268731012c1&language=ar&page=${pageNumber}`
        // `https://api.themoviedb.org/3/movie/popular?api_key=e5a2630c75ead69da5ef2268731012c1&language=ar&page=${pageNumber}`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  //@ useEffect hook to call getAllMovies once when the component mounts
  useEffect(() => {
    getAllMovies();
  }, []);

  //@ Function to search for movies
  const search = async (searchWord) => {
    setLoading(true);
    if (searchWord === "") {
      getAllMovies();
    } else {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=e5a2630c75ead69da5ef2268731012c1&query=${searchWord}`
          // `https://api.themoviedb.org/3/search/movie?api_key=e5a2630c75ead69da5ef2268731012c1&query=${searchWord}`
        );
        setMovies(res.data.results);
        setPageCount(res.data.total_pages);
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="font color-body">
      <NavBar search={search} />
      <Container>
        <MoviesList
          movies={movies}
          loading={loading}
          getPage={getPage}
          pageCount={pageCount}
        />
      </Container>
    </div>
  );
}

export default App;
