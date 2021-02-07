export const state = () => ({
  movies: [],
});

export const mutations = {
  setMovies(state, result) {
    state.movies = result;
  },
};

export const actions = {
  async setMovies(state, query) {
    const movies = await this.$movieDBApi.searchByQuery(query);
    state.commit('setMovies', movies.results);
  },
};

export const getters = {
  getMovies: state => {
    return state.movies;
  },
};
