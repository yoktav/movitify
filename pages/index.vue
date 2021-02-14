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
  name: 'App',
  async fetch(context) {
    try {
      await context.store.dispatch('movies/setMovies', ['harry', 1]);
    } catch (error) {
      throw new Error(error);
    }
  },
  computed: {
    movies() {
      return this.$store.getters['movies/getMovies'];
    },
  },
};
</script>
