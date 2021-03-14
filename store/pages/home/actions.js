import { MODULE_PAGES_HOME } from './constants';
import { movieDBApi } from '~/plugins/services/api/movie-database';

export const setMovies = async ({ commit }, params) => {
  const { query, page: pageNumber } = params;

  const movies = await movieDBApi.searchByQuery(query, pageNumber);

  commit(MODULE_PAGES_HOME.MUTATIONS.SET_MOVIES, movies.results);
};
