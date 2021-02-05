import fetchData from '../../utils/fetchData';

export default (content, inject) => {
  inject('movieDBApi', movieDBApi);
  content.$movieDBApi = movieDBApi;
};

const BASE_URL = process.env.NUXT_ENV_PRODUCT_DOMAIN;

const END_POINTS = {
  searchByQuery: `${BASE_URL}/api/q`,
  searchById: `${BASE_URL}/api/id`,
};

async function searchById(searchQuery) {
  const url = `${END_POINTS.searchById}/${searchQuery}`;

  const movies = await fetchData(url);
  return movies.data;
}

async function searchByQuery(searchQuery) {
  const url = `${END_POINTS.searchByQuery}/${searchQuery}`;

  const movies = await fetchData(url);
  // console.log(movies);

  return movies.data;
}

const movieDBApi = {
  searchByQuery(query) {
    return searchByQuery(`${query}`);
  },
  searchById(query) {
    return searchById(`${query}`);
  },
};
