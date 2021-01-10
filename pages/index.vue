<template>
  <div>
    <Header />

    <div class="container">
      <p v-if="isLoading">Loading</p>

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
  data() {
    return {
      isLoading: true,
      movies: [],
    };
  },
  created() {
    this.searchByQuery('batman');
  },
  methods: {
    async searchByQuery(query) {
      const result = await this.$api.searchByQuery(query);
      this.movies = result.Search;
    },
  },
};
</script>
