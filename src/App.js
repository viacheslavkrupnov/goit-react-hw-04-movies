import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import Container from './components/Container';

const HomePage = lazy(() =>
  import('./components/HomePage' /* webpackChunkName: "HomePage" */),
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
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
