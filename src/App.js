import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set to true since data is being fetched

  // Function to fetch all movies (popular movies)
  const getAllMovies = async () => {
    try {
      setLoading(true); // Set loading to true when starting the API call
      // Fetch the list of popular movies from the API
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=e5a2630c75ead69da5ef2268731012c1&language=ar-EG"
      );

      setMovies(res.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // After the API call completes (success or failure), set loading to false
      setLoading(false);
    }
  };

  // useEffect hook to call getAllMovies once when the component mounts
  useEffect(() => {
    getAllMovies(); // Fetch the movies when the component is first rendered
  }, []); // Empty dependency array ensures this runs only once

  // Function to search for movies based on user input
  const search = async (searchWord) => {
    setLoading(true);
    if (searchWord === "") {
      getAllMovies();
    } else {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=e5a2630c75ead69da5ef2268731012c1&query=${searchWord}`
        );

        setMovies(res.data.results);
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        // Set loading to false after the search API call completes
        setLoading(false);
      }
    }
  };

  return (
    <div className="font color-body">
      {/* Pass the search function as a prop to NavBar */}
      <NavBar search={search} />
      <Container>
        {/* Pass movies and loading state to MoviesList component */}
        <MoviesList movies={movies} loading={loading} />
      </Container>
    </div>
  );
}

export default App;
