import { MODULE_PAGES_SEARCH } from './constants';

export default {
  [MODULE_PAGES_SEARCH.MUTATIONS.SET_MOVIES](state, payload) {
    state.movies = payload;
  },
  [MODULE_PAGES_SEARCH.MUTATIONS.ADD_MOVIES](state, payload) {
    state.isMoviesLoading = false;

    payload.forEach(item => {
      state.movies.push(item);
    });
  },
  [MODULE_PAGES_SEARCH.MUTATIONS.SET_NO_NEW_MOVIE_FOUND](state, payload) {
    state.noNewMovieFound = payload;
  },
  [MODULE_PAGES_SEARCH.MUTATIONS.SET_NO_MOVIE_FOUND](state, payload) {
    state.noMovieFound = payload;
  },
  [MODULE_PAGES_SEARCH.MUTATIONS.SET_IS_LAST_PAGE](state, payload) {
    state.isLastPage = payload;
  },
  [MODULE_PAGES_SEARCH.MUTATIONS.SET_IS_MOVIES_LOADING](state, payload) {
    state.isMoviesLoading = payload;
  },
};
