import * as types from './mutation_types';

export const setCurrentSearchQuery = async ({ commit }, query) => {
  commit(types.SET_CURRENT_SEARCH_QUERY, query);
};

export const setIsSearchOpen = async ({ commit }, query) => {
  commit(types.SET_IS_SEARCH_OPEN, query);
};
