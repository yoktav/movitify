import * as types from './mutation_types';
import { movieDBApi } from '~/plugins/services/api/movie-database';

export const setMovies = async ({ commit }, params) => {
  const query = params[0];
  const pageNumber = params[1];

  const movies = await movieDBApi.searchByQuery(query, pageNumber);

  commit(types.SET_MOVIES, movies.results);

  if (pageNumber > movies.total_pages) {
    commit(types.SET_NO_MOVIE_FOUND, true);
  }
};

export const addMovies = async ({ commit }, params) => {
  const query = params[0];
  const pageNumber = params[1];

  commit(types.SET_IS_MOVIES_LOADING, true);

  const movies = await movieDBApi.searchByQuery(query, pageNumber);

  if (pageNumber <= movies.total_pages) {
    commit(types.ADD_MOVIES, movies.results);
  }

  if (movies.page === movies.total_pages) {
    commit(types.SET_NO_NEW_MOVIE_FOUND, true);
    commit(types.SET_IS_LAST_PAGE, true);
  }

  if (pageNumber > movies.total_pages) {
    commit(types.SET_NO_MOVIE_FOUND, true);
  }
};

export const clearMovies = async ({ commit }) => {
  commit(types.SET_MOVIES, []);
};
