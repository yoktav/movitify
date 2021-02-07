<template>
  <div>
    <Header />

    <div class="container">
      <div v-if="movies" class="row">
        <div v-for="(movie, i) in movies" :key="i" class="col col--md-3">
          <MovieCard
            :id="movie.id"
            :poster-src="movie.poster_path"
            :poster-alt="movie.title"
            :title="movie.title"
          />
        </div>
      </div>

      <p v-else class="u-color-warning u-text-align-center">No movies found.</p>
    </div>
  </div>
</template>

<script>
export default {
  async fetch(context) {
    await context.store.dispatch('movies/setMovies', context.route.query.q);
    context.store.dispatch('movies/setCurrentSearchQuery', context.route.query.q);
  },
  computed: {
    movies() {
      return this.$store.getters['movies/getMovies'];
    },
  },
};
</script>
