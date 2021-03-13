const REDIS_PORT = 6379;
const ONE_HOUR = 3600;

const express = require('express');

let redis;
let client;

if (process.env.NUXT_ENV_IS_REDIS_OPEN === '1') {
  redis = require('redis');
  client = redis.createClient(REDIS_PORT);
}

const app = express();

const BASE_URL = process.env.NUXT_ENV_MOVIE_DB_BASE_URL;
const API_VERSION = process.env.NUXT_ENV_MOVIE_DB_VERSION;
const API_KEY = process.env.NUXT_ENV_MOVIE_DB_API_KEY;

const END_POINTS = {
  site: `${BASE_URL}/${API_VERSION}`,
};

export { ONE_HOUR, client, app, API_KEY, END_POINTS };
