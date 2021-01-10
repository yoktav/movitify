var express = require('express');
var app = express();

import axios from 'axios';

const BASE_URL = 'https://www.omdbapi.com';
const API_KEY = process.env.NUXT_ENV_OMDB_API_KEY;

const END_POINTS = {
  searchbyQuery: `${BASE_URL}/?apikey=${API_KEY}&s`,
  searchById: `${BASE_URL}/?apikey=${API_KEY}&i`,
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

async function searchMovie(method, search_key) {
  let url = null;

  if (method === 'searchbyQuery') {
    url = `${END_POINTS.searchbyQuery}=${search_key}`;
  } else if (method === 'searchbyId') {
    url = `${END_POINTS.searchbyId}=${search_key}`;
  } else {
    return 'Error: Check your method!';
  }

  const movies = await fetchData(url);

  return JSON.stringify(movies);
}

app.get('/', function (request, response) {
  response.json({ Response: 'false', Error: 'Bad request!' });
});

app.get('/q/:slug', function (request, response) {
  searchMovie('searchbyQuery', request.params.slug)
    .then(request => {
      response.end(request);
    })
    .catch(error => {
      response.end({ Error: error });
    });
});

app.get('/id/:slug', function (request, response) {
  searchMovie('searchbyId', request.params.slug)
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
