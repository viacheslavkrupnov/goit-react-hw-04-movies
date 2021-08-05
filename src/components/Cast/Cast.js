import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moviesApi from '../../services/moviesApi';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const srcBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const renderMovieCast = () => {
      moviesApi.fetchMovieCast(movieId).then(setCast);
    };
    renderMovieCast();
  }, [movieId]);

  return (
    <>
      {cast && (
        <>
          <ul className={s.castList}>
            {cast.map(({ id, profile_path, name, character }) => (
              <li className={s.castListItem} key={id}>
                <img
                  className={s.image}
                  src={`${srcBaseUrl}${profile_path}`}
                  alt=""
                />
                <h3>{name}</h3>
                <span>Charachter: {character}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
