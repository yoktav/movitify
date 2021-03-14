import { MODULE_PAGES_HOME } from './constants';

export default {
  [MODULE_PAGES_HOME.MUTATIONS.SET_MOVIES](state, payload) {
    state.movies = payload;
  },
};
