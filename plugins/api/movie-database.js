import fetchData from '../../utils/fetchData';

export default (content, inject) => {
  inject('api', api);
  content.$api = api;
};

const BASE_URL = process.env.NUXT_ENV_DOMAIN;
const SEARCH_BY_QUERY_STATE = 'searchByQuery';
const SEARCH_BY_ID_STATE = 'searchById';

const END_POINTS = {
  searchByQuery: `${BASE_URL}/api/q`,
  searchById: `${BASE_URL}/api/id`,
};

async function searchMovie(method, query) {
  let url = null;

  if (method === SEARCH_BY_QUERY_STATE) {
    url = `${END_POINTS.searchByQuery}/${query}`;
  } else if (method === SEARCH_BY_ID_STATE) {
    url = `${END_POINTS.searchById}/${query}`;
  } else {
    return 'Error: Check your method!';
  }

  const movies = await fetchData(url);
  return movies.data;
}

const api = {
  searchByQuery(query) {
    return searchMovie(SEARCH_BY_QUERY_STATE, `${query}`);
  },
  searchById(query) {
    return searchMovie(SEARCH_BY_ID_STATE, `${query}`);
  },
};
