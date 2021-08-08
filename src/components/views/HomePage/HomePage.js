import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import moviesApi from '../../../services/moviesApi';
import s from './HomePage.module.css';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { url } = useRouteMatch();
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const location = useLocation();

  useEffect(() => {
    const renderTrendingMovies = () => {
      moviesApi
        .fetchTrendingMovies()
        .then(response => setTrendingMovies(response));
    };
    renderTrendingMovies();
  }, []);

  return (
    <>
      <h1 className={s.title}>Trending Today</h1>
      <ul className={s.filmsList}>
        {trendingMovies.map(({ poster_path, title, id }) => (
          <li key={id} className={s.filmsListItem}>
            <Link
              className={s.link}
              to={{
                pathname: `${url}movies/${id}`,
                state: {
                  from: location,
                },
              }}
            >
              <img
                className={s.image}
                src={`${srcBaseUrl}${poster_path}`}
                alt=""
              />
              <h3 className={s.movieTitle}>{title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
