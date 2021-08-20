import { useEffect, useState } from 'react';

const MOVIESURL = 'https://my.api.mockaroo.com/movies.json';
const MOVIESURLKEY = 'key=bf3c1c60';

export interface Movie {
  id: number;
  name: string;
  created_at: string;
}

// TODO could turn this into a more generic fetch func, add url as param.
export function useFetchMovies(): {
  loading: boolean;
  error: boolean;
  data: null | Movie[];
} {
  const [movieRequestData, setMovieRequestData] = useState({
    loading: false,
    error: false,
    data: null,
  });

  useEffect(() => {
    setMovieRequestData({
      error: false,
      loading: true,
      data: null,
    });

    async function fetchMovies() {
      try {
        const moviesData = await fetch(`${MOVIESURL}?${MOVIESURLKEY}`);
        const moviesJSON = await moviesData.json();

        setMovieRequestData({
          error: false,
          loading: false,
          data: moviesJSON,
        });
      } catch (e) {
        setMovieRequestData({
          error: true,
          loading: false,
          data: null,
        });
      }
    }
    fetchMovies();
  }, []);

  return movieRequestData;
}
