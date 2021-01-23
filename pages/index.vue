<template>
  <div>
    <Header />

    <div class="container">
      <div class="row">
        <div v-for="(movie, i) in movies" :key="i" class="col col--md-3">
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
  async fetch(context) {
    await context.store.dispatch('movies/setMovies', 'harry');
  },
  computed: {
    movies() {
      return this.$store.getters['movies/getMovies'];
    },
  },
};
</script>
