import fetchData from '../../utils/fetchData';

const REDIS_PORT = 6379;
const ONE_HOUR = 3600;

const express = require('express');
const redis = require('redis');

const client = redis.createClient(REDIS_PORT);
const app = express();

const BASE_URL = process.env.NUXT_ENV_OMDB_BASE_URL;
const API_KEY = process.env.NUXT_ENV_OMDB_API_KEY;
const SEARCH_BY_QUERY_STATE = 'searchByQuery';
const SEARCH_BY_ID_STATE = 'searchById';

const END_POINTS = {
  searchByQuery: `${BASE_URL}/?apikey=${API_KEY}&s`,
  searchById: `${BASE_URL}/?apikey=${API_KEY}&i`,
};

async function searchMovie(method, searchQuery) {
  let url = null;

  if (method === SEARCH_BY_QUERY_STATE) {
    url = `${END_POINTS.searchByQuery}=${searchQuery}`;
  } else if (method === SEARCH_BY_ID_STATE) {
    url = `${END_POINTS.searchById}=${searchQuery}`;
  } else {
    return 'Error: Check your method!';
  }

  const movies = await fetchData(url);
  const data = JSON.stringify(movies.data);

  // Set data to Redis
  client.setex(searchQuery, ONE_HOUR, data);

  return data;
}

// Cache middleware
function cache(request, response, next) {
  const searchQuery = request.params.slug;

  client.get(searchQuery, (error, data) => {
    if (error) throw error;

    if (data !== null) {
      response.end(data);
    } else {
      next();
    }
  });
}

app.get('/q/:slug', cache, function (request, response) {
  searchMovie(SEARCH_BY_QUERY_STATE, request.params.slug)
    .then(request => {
      response.end(request);
    })
    .catch(error => {
      response.end({ Error: error });
    });
});

app.get('/id/:slug', cache, function (request, response) {
  searchMovie(SEARCH_BY_ID_STATE, request.params.slug)
    .then(request => {
      response.end(request);
    })
    .catch(error => {
      response.end({ Error: error });
    });
});

module.exports = {
  path: '/api/',
  handler: app,
};
