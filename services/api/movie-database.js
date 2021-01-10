import fetchData from '../../utils/fetchData';

var express = require('express');
var app = express();

const BASE_URL = process.env.NUXT_ENV_OMDB_BASE_URL;
const API_KEY = process.env.NUXT_ENV_OMDB_API_KEY;
const SEARCH_BY_QUERY_STATE = 'searchByQuery';
const SEARCH_BY_ID_STATE = 'searchById';

const END_POINTS = {
  searchByQuery: `${BASE_URL}/?apikey=${API_KEY}&s`,
  searchById: `${BASE_URL}/?apikey=${API_KEY}&i`,
};

async function searchMovie(method, query) {
  let url = null;

  if (method === SEARCH_BY_QUERY_STATE) {
    url = `${END_POINTS.searchByQuery}=${query}`;
  } else if (method === SEARCH_BY_ID_STATE) {
    url = `${END_POINTS.searchById}=${query}`;
  } else {
    return 'Error: Check your method!';
  }

  const movies = await fetchData(url);
  return JSON.stringify(movies.data);
}

app.get('/', function (request, response) {
  response.json({ Response: 'false', Error: 'Bad request!' });
});

app.get('/q/:slug', function (request, response) {
  searchMovie(SEARCH_BY_QUERY_STATE, request.params.slug)
    .then(request => {
      response.end(request);
    })
    .catch(error => {
      response.json({ Error: error });
    });
});

app.get('/id/:slug', function (request, response) {
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
