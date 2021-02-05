import fetchData from '../../utils/fetchData';

const REDIS_PORT = 6379;
const ONE_HOUR = 3600;

const express = require('express');
const redis = require('redis');

const client = redis.createClient(REDIS_PORT);
const app = express();

const BASE_URL = process.env.NUXT_ENV_MOVIE_DB_BASE_URL;
const API_VERSION = process.env.NUXT_ENV_MOVIE_DB_VERSION;
const API_KEY = process.env.NUXT_ENV_MOVIE_DB_API_KEY;

const END_POINTS = {
  site: `${BASE_URL}/${API_VERSION}`,
};

async function searchById(searchId) {
  const url = `${END_POINTS.site}/movie/${searchId}?api_key=${API_KEY}`;
  const movies = await fetchData(url);
  const data = movies.data;

  // Set data to Redis
  client.setex(searchId, ONE_HOUR, data);

  return data;
}

async function searchByQuery(searchQuery) {
  const url = `${END_POINTS.site}/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
  const movies = await fetchData(url);
  const data = movies.data;

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
  searchByQuery(request.params.slug)
    .then(request => {
      response.json(request);
    })
    .catch(error => {
      response.json({ Error: error });
    });
});

app.get('/id/:slug', cache, function (request, response) {
  searchById(request.params.slug)
    .then(request => {
      response.json(request);
    })
    .catch(error => {
      response.json({ Error: error });
    });
});

module.exports = {
  path: '/api/',
  handler: app,
};
