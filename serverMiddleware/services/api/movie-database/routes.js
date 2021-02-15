import { app } from './constans';
import { searchByQuery, searchById } from './functions';
import cache from './cache';

app.get('/q/:slug', cache, function (request, response) {
  searchByQuery(request.params.slug, request.query.page)
    .then(request => {
      response.end(request);
    })
    .catch(error => {
      response.end({ Error: error });
    });
});

app.get('/id/:slug', cache, function (request, response) {
  searchById(request.params.slug)
    .then(request => {
      response.end(request);
    })
    .catch(error => {
      response.end({ Error: error });
    });
});
