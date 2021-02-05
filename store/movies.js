export const state = () => ({
  movies: [],
});

export const mutations = {
  setMovies(state, result) {
    state.movies = result;
  },
};

export const getters = {
  getMovies: state => {
    return state.movies;
  },
};

export const actions = {
  async setMovies(state, query) {
    const result = await this.$movieDBApi.searchByQuery(query);
    state.commit('setMovies', result.Search);
  },
};
