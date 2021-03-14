import { MODULE_SEARCH } from './constants';

export default {
  [MODULE_SEARCH.MUTATIONS.SET_CURRENT_SEARCH_QUERY](state, payload) {
    state.currentSearchQuery = payload;
  },
  [MODULE_SEARCH.MUTATIONS.SET_IS_SEARCH_OPEN](state, payload) {
    state.isSearchOpen = payload;
  },
};
