import fetchData from '../../../../utils/fetchData.js';
import { ONE_HOUR, client, END_POINTS, API_KEY } from './constans';

async function searchByQuery(searchQuery, pageNumber) {
  const cacheId = `query=${searchQuery}&page=${pageNumber}`;
  const url = `${END_POINTS.site}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNumber}`;
  const movies = await fetchData(url);
  const data = JSON.stringify(movies.data);

  // Set data to Redis
  client.setex(cacheId, ONE_HOUR, data);

  return data;
}

async function searchById(searchId) {
  const cacheId = `id=${searchId}`;
  const url = `${END_POINTS.site}/movie/${searchId}?api_key=${API_KEY}`;
  const movies = await fetchData(url);
  const data = JSON.stringify(movies.data);

  // Set data to Redis
  client.setex(cacheId, ONE_HOUR, data);

  return data;
}

export { searchByQuery, searchById };
