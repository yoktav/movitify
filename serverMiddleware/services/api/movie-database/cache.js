import { client } from './constans';

export default function cache(request, response, next) {
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
