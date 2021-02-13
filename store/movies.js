export const state = () => ({
  movies: [],
  noNewMovieState: false,
});

export const mutations = {
  setMovies(state, payload) {
    state.movies = payload;
  },
  addMovies(state, payload) {
    payload.forEach(item => {
      state.movies.push(item);
    });
  },
  setNoNewMovieState(state, payload) {
    state.noNewMovieState = payload;
  },
};

export const actions = {
  async setMovies(state, params) {
    const query = params[0];
    const pageNumber = params[1];

    const movies = await this.$movieDBApi.searchByQuery(query, pageNumber);
    state.commit('setMovies', movies.results);
  },
  async addMovies(state, params) {
    const query = params[0];
    const pageNumber = params[1];

    const movies = await this.$movieDBApi.searchByQuery(query, pageNumber);

    if (movies.page === movies.total_pages) {
      state.commit('setNoNewMovieState', true);
    }

    if (movies.page <= movies.total_pages) {
      state.commit('addMovies', movies.results);
    }
  },
};

export const getters = {
  getMovies: state => {
    return state.movies;
  },
  getNoNewMovieState: state => {
    return state.noNewMovieState;
  },
};
