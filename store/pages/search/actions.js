import * as types from './mutation_types';
import { movieDBApi } from '~/plugins/services/api/movie-database';

export const setMovies = async ({ commit }, params) => {
  const { query, pageNumber } = params;

  commit(types.SET_IS_MOVIES_LOADING, true);

  const movies = await movieDBApi.searchByQuery(query, pageNumber);

  commit(types.SET_MOVIES, movies.results);
  commit(types.SET_IS_LAST_PAGE, false);
  commit(types.SET_NO_NEW_MOVIE_FOUND, false);
  commit(types.SET_IS_MOVIES_LOADING, false);
  commit(types.SET_NO_MOVIE_FOUND, false);

  if (pageNumber > movies.total_pages) {
    commit(types.SET_NO_MOVIE_FOUND, true);
  }
};

export const addMovies = async ({ commit }, params) => {
  let { query, page: pageNumber } = params;

  pageNumber = parseInt(pageNumber, 10);

  commit(types.SET_IS_MOVIES_LOADING, true);

  const result = await Promise.all(
    new Array(pageNumber).fill(query).map((query, index) => {
      index++; // Make first value of index 1 instead of 0
      return new Promise(resolve => {
        movieDBApi
          .searchByQuery(query, index)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            console.error(error);
            resolve([]);
          });
      });
    }),
  );

  const totalPageCount = result[0].total_pages;

  const movies = result.reduce((accumulator, currentValue) => {
    return [...accumulator, ...currentValue.results];
  }, []);

  if (pageNumber <= totalPageCount) {
    commit(types.ADD_MOVIES, movies);
    commit(types.SET_IS_MOVIES_LOADING, false);
  }

  if (pageNumber === totalPageCount) {
    commit(types.SET_NO_NEW_MOVIE_FOUND, true);
    commit(types.SET_IS_LAST_PAGE, true);
    commit(types.SET_IS_MOVIES_LOADING, false);
  }

  if (pageNumber > totalPageCount) {
    commit(types.SET_NO_MOVIE_FOUND, true);
    commit(types.SET_IS_MOVIES_LOADING, false);
  }
};

export const clearMovies = async ({ commit }) => {
  commit(types.SET_MOVIES, []);
};
