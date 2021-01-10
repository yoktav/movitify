import axios from 'axios';

export default (content, inject) => {
  inject('api', api);
  content.$api = api;
};

const BASE_URL = process.env.NUXT_ENV_DOMAIN;

const END_POINTS = {
  searchByQuery: `${BASE_URL}/api/q`,
  searchById: `${BASE_URL}/api/id`,
};

async function fetchData(url) {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  try {
    const response = await axios.get(url, config);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function searchMovie(method, query) {
  let url = null;

  if (method === 'searchByQuery') {
    url = `${END_POINTS.searchByQuery}/${query}`;
  } else if (method === 'searchById') {
    url = `${END_POINTS.searchById}/${query}`;
  } else {
    return 'Error: Check your method!';
  }
  const movies = await fetchData(url);
  return movies;
}

const api = {
  searchByQuery(query) {
    return searchMovie('searchByQuery', `${query}`);
  },
  searchById(query) {
    return searchMovie('searchById', `${query}`);
  },
};
