<template>
  <div>
    <Header />

    <div class="container">
      <div class="row">
        <div v-for="movie in movies" :key="movie.imdbID" class="col col--md-3">
          <MovieCard
            :id="movie.imdbID"
            :poster-src="movie.Poster"
            :poster-alt="movie.Title"
            :title="movie.Title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  async asyncData({ $api }) {
    const result = await $api.searchByQuery('harry');
    const movies = result.Search;
    return { movies };
  },
};
</script>
