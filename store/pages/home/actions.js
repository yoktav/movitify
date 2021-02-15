import * as types from './mutation_types';
import { movieDBApi } from '~/plugins/services/api/movie-database';

export const setMovies = async ({ commit }, params) => {
  const [query, pageNumber] = params;

  const movies = await movieDBApi.searchByQuery(query, pageNumber);

  commit(types.SET_MOVIES, movies.results);
};
