import { client } from './constans';

export default function cache(request, response, next) {
  if (process.env.NUXT_ENV_IS_REDIS_OPEN === '0') {
    next();
    return;
  }

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
