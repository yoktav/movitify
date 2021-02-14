import * as types from './mutation_types';

export default {
  [types.SET_CURRENT_SEARCH_QUERY](state, payload) {
    state.currentSearchQuery = payload;
  },
  [types.SET_IS_SEARCH_OPEN](state, payload) {
    state.isSearchOpen = payload;
  },
};
