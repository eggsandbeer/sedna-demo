import type { NextPage } from 'next';

import { createContext, useState, Dispatch, SetStateAction } from 'react';

import { useFetchMovies } from '../hooks/useFetchMovies';

import MovieList from '../components/MovieList/MovieList';
import MovieListTagFilter from '../components/MovieList/MovieListTagFilter';

import styles from '../styles/Home.module.css';

type ContextProps = {
  tagFilter: string;
  setTagFilter: Dispatch<SetStateAction<string>>;
};
// TODO. Probably could move this context into it's own file.
export const TagSearchContext = createContext<ContextProps>({
  tagFilter: '',
  setTagFilter: () => {},
});

const Home: NextPage = () => {
  const { error, loading, data: movies } = useFetchMovies();

  const [tagFilter, setTagFilter] = useState('');

  return (
    <div className={styles.container}>
      {loading && <>. . . loading</>}
      {error && <>something bad happened.</>}
      {movies && !error && !loading && (
        <>
          <TagSearchContext.Provider
            value={{
              tagFilter,
              setTagFilter,
            }}
          >
            <MovieListTagFilter />
            <MovieList movies={movies} />
          </TagSearchContext.Provider>
        </>
      )}
    </div>
  );
};

export default Home;
