import { useState, useEffect } from 'react';
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import moviesApi from '../../../services/moviesApi';
import s from './MoviesPage.module.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.search === '') {
      return;
    }
    const newSearch = new URLSearchParams(location.search).get('query');
    // setQuery(newSearch);
    const renderMoviesByQyery = () => {
      moviesApi.fetchMoviesByQuery(newSearch).then(setMovies);
    };
    renderMoviesByQyery();
  }, [location.search]);

  const handleRequestChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return toast.info(`Please enter search query`);
    }
    setQuery('');
    history.push({ ...location, search: `query=${query}` });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className={s.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies here"
          value={query}
          onChange={handleRequestChange}
        />
        <button className={s.searchButton} type="submit">
          <span>Search</span>
        </button>
      </form>
      {movies && (
        <>
          <ul>
            {movies.map(({ title, id }) => (
              <NavLink
                to={{
                  pathname: `${url}/${id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                <li key={id}>{title}</li>
              </NavLink>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
