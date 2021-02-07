export const state = () => ({
  movies: [],
  currentSearchQuery: null,
  isSearchOpen: false,
});

export const mutations = {
  setMovies(state, result) {
    state.movies = result;
  },
  setCurrentSearchQuery(state, query) {
    state.currentSearchQuery = query;
  },
  setIsSearchOpen(state, result) {
    state.isSearchOpen = result;
  },
};

export const actions = {
  async setMovies(state, query) {
    const movies = await this.$movieDBApi.searchByQuery(query);
    state.commit('setMovies', movies.results);
  },
  setCurrentSearchQuery(state, query) {
    state.commit('setCurrentSearchQuery', query);
  },
  setIsSearchOpen(state, query) {
    state.commit('setIsSearchOpen', query);
  },
};

export const getters = {
  getMovies: state => {
    return state.movies;
  },
  getCurrentSearchQuery: state => {
    return state.currentSearchQuery;
  },
  getIsSearchOpen: state => {
    return state.isSearchOpen;
  },
};
