import { MODULE_PAGES_SEARCH } from './constants';
import { movieDBApi } from '~/plugins/services/api/movie-database';

export const setMovies = async ({ commit }, params) => {
  const { query, pageNumber } = params;

  commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_IS_MOVIES_LOADING, true);

  const movies = await movieDBApi.searchByQuery(query, pageNumber);

  commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_MOVIES, movies.results);
  commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_IS_LAST_PAGE, false);
  commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_NO_NEW_MOVIE_FOUND, false);
  commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_IS_MOVIES_LOADING, false);
  commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_NO_MOVIE_FOUND, false);

  if (pageNumber > movies.total_pages) {
    commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_NO_MOVIE_FOUND, true);
  }
};

export const addMovies = async ({ commit }, params) => {
  let { query, page: pageNumber } = params;

  pageNumber = parseInt(pageNumber, 10);

  commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_IS_MOVIES_LOADING, true);

  const result = await Promise.all(
    new Array(pageNumber).fill(query).map((query, index) => {
      index++; // Make first value of index 1 instead of 0
      return new Promise(resolve => {
        movieDBApi
          .searchByQuery(query, index)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            console.error(error);
            resolve([]);
          });
      });
    }),
  );

  const totalPageCount = result[0].total_pages;

  const movies = result.reduce((accumulator, currentValue) => {
    return [...accumulator, ...currentValue.results];
  }, []);

  if (pageNumber <= totalPageCount) {
    commit(MODULE_PAGES_SEARCH.MUTATIONS.ADD_MOVIES, movies);
    commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_IS_MOVIES_LOADING, false);
  }

  if (pageNumber === totalPageCount) {
    commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_NO_NEW_MOVIE_FOUND, true);
    commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_IS_LAST_PAGE, true);
    commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_IS_MOVIES_LOADING, false);
  }

  if (pageNumber > totalPageCount) {
    commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_NO_MOVIE_FOUND, true);
    commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_IS_MOVIES_LOADING, false);
  }
};

export const clearMovies = async ({ commit }) => {
  commit(MODULE_PAGES_SEARCH.MUTATIONS.SET_MOVIES, []);
};
