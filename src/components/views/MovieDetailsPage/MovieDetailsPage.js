import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  Route,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import moviesApi from '../../../services/moviesApi';

import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../../Cast' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import('../../Reviews' /* webpackChunkName: "Reviews" */),
);

export default function MovieDetailsPage() {
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [isVisibleCast, setIsVisibleCast] = useState(false);
  const [isVisibleReviews, setIsVisibleReviews] = useState(false);

  useEffect(() => {
    const renderMovieDetails = () => {
      moviesApi.fetchMovieDetails(movieId).then(setMovie);
    };
    renderMovieDetails();
  }, [movieId]);

  const makeVisibleCast = () => {
    if (isVisibleReviews === true) {
      setIsVisibleReviews(false);
    }
    setIsVisibleCast(true);
  };

  const makeVisibleReviews = () => {
    if (isVisibleCast === true) {
      setIsVisibleCast(false);
    }
    setIsVisibleReviews(true);
  };

  const goBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      <button className={s.button} onClick={goBack}>
        <span>Go Back</span>
      </button>
      {movie && (
        <>
          {movie.poster_path ? (
            <img
              className={s.image}
              src={`${srcBaseUrl}${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <img
              className={s.image}
              src={
                'https://dummyimage.com/400x600/cfcfcf/ffffff&text=NO+IMAGE+AVAILABLE'
              }
              alt=""
            />
          )}
          <h3>
            {movie.title}({movie.release_date.split('-')[0]})
          </h3>
          <span>User Score: {movie.vote_average * 10}%</span>
          <h2>Overview</h2>
          <span>{movie.overview}</span>
          {<h3>Genres</h3>}
          {<span>{movie.genres.map(genre => genre.name).join(' ')}</span>}
          <hr />
          <span>Additional information</span>
          <span role="img" aria-label="face emoji">
            👇🏻
          </span>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location?.state?.from ?? '/' },
                }}
                onClick={makeVisibleCast}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location?.state?.from ?? '/' },
                }}
                onClick={makeVisibleReviews}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />

          <Suspense fallback={<h1>Загружаем...</h1>}>
            <Route path={`${path}/:cast`}>
              {movie && isVisibleCast && <Cast />}
            </Route>

            <Route path={`${path}/:reviews`}>
              {movie && isVisibleReviews && <Reviews />}
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
