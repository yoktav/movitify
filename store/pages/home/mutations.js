import * as types from './mutation_types';

export default {
  [types.SET_MOVIES](state, payload) {
    state.movies = payload;
  },
};
