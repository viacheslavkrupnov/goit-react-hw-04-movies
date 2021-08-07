import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppBar from './components/AppBar';
import Container from './components/Container';

const HomePage = lazy(() =>
  import('./components/views/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import('./components/views/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/views/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
  ),
);

function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>Загружаем...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route component={HomePage} />
        </Switch>
      </Suspense>

      <ToastContainer autoClose={3000} position="top-right" />
    </Container>
  );
}

export default App;
