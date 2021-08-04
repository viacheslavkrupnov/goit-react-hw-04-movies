import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'b28a43708d64e0a6bb2d8707a913b498';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  language: 'en-US',
};

const fetchTrendingMovies = async () => {
  try {
    const config = {
      url: `trending/movie/day`,
    };

    const { data } = await axios(config);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
};

async function fetchMovieDetails(movie_id) {
  try {
    const config = {
      url: `movie/${movie_id}`,
    };

    const { data } = await axios(config, movie_id);
    return data;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchMovieCast(movie_id) {
  try {
    const config = {
      url: `movie/${movie_id}/credits`,
    };

    const { data } = await axios(config, movie_id);
    return data.cast;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchMovieReviews(movie_id) {
  try {
    const config = {
      url: `movie/${movie_id}/reviews`,
    };

    const { data } = await axios(config, movie_id);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
}

async function fetchMoviesByQuery(query) {
  try {
    const config = {
      url: `search/movie`,
      params: {
        query,
      },
    };

    const { data } = await axios(config);
    return data.results;
  } catch (error) {
    new Error('No response from server');
  }
}

const api = {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
  fetchMoviesByQuery,
};

export default api;

//___________________________________________________________________________________
// Api using fetch()
// const baseURL = `https://api.themoviedb.org/3`;

// function fetchTrendingMovies() {
//   const url = `${baseURL}/trending/${media_type}/${time_window}?api_key=${key}`;
//   return fetch(url)
//     .then(response => response.json())
//     .then(({ results }) => {
//       return results;
//     });
// }
