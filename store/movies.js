export const state = () => ({
  movies: [],
  noNewMovieState: false,
  noMovieFoundState: false,
  isLastPage: false,
  isMoviesLoading: false,
});

export const mutations = {
  setMovies(state, payload) {
    state.movies = payload;
  },
  addMovies(state, payload) {
    state.isMoviesLoading = false;

    payload.forEach(item => {
      state.movies.push(item);
    });
  },
  setNoNewMovieState(state, payload) {
    state.noNewMovieState = payload;
  },
  setNoMovieFoundState(state, payload) {
    state.noMovieFoundState = payload;
  },
  setIsLastPage(state, payload) {
    state.isLastPage = payload;
  },
  setIsMoviesLoading(state, payload) {
    state.isMoviesLoading = payload;
  },
};

export const actions = {
  async setMovies(state, params) {
    const query = params[0];
    const pageNumber = params[1];

    const movies = await this.$movieDBApi.searchByQuery(query, pageNumber);
    state.commit('setMovies', movies.results);

    if (pageNumber > movies.total_pages) {
      state.commit('setNoMovieFoundState', true);
    }
  },
  async addMovies(state, params) {
    const query = params[0];
    const pageNumber = params[1];
    state.commit('setIsMoviesLoading', true);

    const movies = await this.$movieDBApi.searchByQuery(query, pageNumber);

    if (pageNumber <= movies.total_pages) {
      state.commit('addMovies', movies.results);
    }

    if (movies.page === movies.total_pages) {
      state.commit('setNoNewMovieState', true);
      state.commit('setIsLastPage', true);
    }

    if (pageNumber > movies.total_pages) {
      state.commit('setNoMovieFoundState', true);
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
  getNoMovieFoundState: state => {
    return state.noMovieFoundState;
  },
  getIsLastPage: state => {
    return state.isLastPage;
  },
  getIsMoviesLoading: state => {
    return state.isMoviesLoading;
  },
};
