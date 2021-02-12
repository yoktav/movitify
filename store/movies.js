export const state = () => ({
  movies: [],
});

export const mutations = {
  setMovies(state, result) {
    state.movies = result;
  },
};

export const actions = {
  async setMovies(state, params) {
    const query = params[0];
    const pageNumber = params[1];

    const movies = await this.$movieDBApi.searchByQuery(query, pageNumber);
    state.commit('setMovies', movies.results);
  },
};

export const getters = {
  getMovies: state => {
    return state.movies;
  },
};
