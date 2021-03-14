import { MODULE_SEARCH } from './constants';

export const setCurrentSearchQuery = async ({ commit }, query) => {
  commit(MODULE_SEARCH.MUTATIONS.SET_CURRENT_SEARCH_QUERY, query);
};

export const setIsSearchOpen = async ({ commit }, query) => {
  commit(MODULE_SEARCH.MUTATIONS.SET_IS_SEARCH_OPEN, query);
};
