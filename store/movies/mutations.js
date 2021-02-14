import * as types from './mutation_types';

export default {
  [types.SET_MOVIES](state, payload) {
    state.movies = payload;
  },
  [types.ADD_MOVIES](state, payload) {
    state.isMoviesLoading = false;

    payload.forEach(item => {
      state.movies.push(item);
    });
  },
  [types.SET_NO_NEW_MOVIE_FOUND](state, payload) {
    state.noNewMovieFound = payload;
  },
  [types.SET_NO_MOVIE_FOUND](state, payload) {
    state.noMovieFound = payload;
  },
  [types.SET_IS_LAST_PAGE](state, payload) {
    state.isLastPage = payload;
  },
  [types.SET_IS_MOVIES_LOADING](state, payload) {
    state.isMoviesLoading = payload;
  },
};
