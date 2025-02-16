import { fetchData } from '~/utils/fetchData';

export default (content, inject) => {
  inject('movieDBApi', movieDBApi);
  content.$movieDBApi = movieDBApi;
};

const BASE_URL = process.env.NUXT_ENV_PRODUCT_DOMAIN;

const END_POINTS = {
  searchByQuery: `${BASE_URL}/api/q`,
  searchById: `${BASE_URL}/api/id`,
};

async function searchById(searchId) {
  try {
    const url = `${END_POINTS.searchById}/${searchId}`;
    const movies = await fetchData(url);

    return movies.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function searchByQuery(searchQuery, pageNumber) {
  try {
    searchQuery = encodeURI(searchQuery);

    const url = `${END_POINTS.searchByQuery}/${searchQuery}?page=${pageNumber}`;
    const movies = await fetchData(url);

    return movies.data;
  } catch (error) {
    throw new Error(error);
  }
}

export const movieDBApi = {
  searchByQuery(query, pageNumber) {
    return searchByQuery(`${query}`, `${pageNumber}`);
  },
  searchById(id) {
    return searchById(`${id}`);
  },
};
