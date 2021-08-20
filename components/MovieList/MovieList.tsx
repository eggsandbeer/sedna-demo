import React from 'react';

import MovieListItem from './MovieListItem/MovieListItem';

import { Movie } from '../../hooks/useFetchMovies';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <>
      {movies?.map((movie: Movie) => (
        <MovieListItem key={movie.id} {...movie} />
      ))}
    </>
  );
};

export default MovieList;
