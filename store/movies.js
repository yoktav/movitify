export const state = () => ({
  movies: [],
  currentSearchQuery: null,
});

export const mutations = {
  setMovies(state, result) {
    state.movies = result;
  },
  setCurrentSearchQuery(state, query) {
    state.currentSearchQuery = query;
  },
};

export const getters = {
  getMovies: state => {
    return state.movies;
  },
  getCurrentSearchQuery: state => {
    return state.currentSearchQuery;
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
};
