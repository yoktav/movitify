export const state = () => ({
  currentSearchQuery: null,
  isSearchOpen: false,
});

export const mutations = {
  setCurrentSearchQuery(state, query) {
    state.currentSearchQuery = query;
  },
  setIsSearchOpen(state, result) {
    state.isSearchOpen = result;
  },
};

export const actions = {
  setCurrentSearchQuery(state, query) {
    state.commit('setCurrentSearchQuery', query);
  },
  setIsSearchOpen(state, query) {
    state.commit('setIsSearchOpen', query);
  },
};

export const getters = {
  getCurrentSearchQuery: state => {
    return state.currentSearchQuery;
  },
  getIsSearchOpen: state => {
    return state.isSearchOpen;
  },
};
