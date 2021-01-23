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
const INITIAL_SEARCH_KEY = 'harry';

export default {
  name: 'App',
  async asyncData({ store, $api }) {
    const result = await $api.searchByQuery(INITIAL_SEARCH_KEY);
    store.state.movies.movies = result.Search;
  },
  computed: {
    movies() {
      return this.$store.getters['movies/getMovies'];
    },
  },
};
</script>
