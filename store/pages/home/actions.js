import * as types from './mutation_types';
import { movieDBApi } from '~/plugins/services/api/movie-database';

export const setMovies = async ({ commit }, params) => {
  const query = params[0];
  const pageNumber = params[1];

  const movies = await movieDBApi.searchByQuery(query, pageNumber);

  commit(types.SET_MOVIES, movies.results);
};
