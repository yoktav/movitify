<template>
  <div>
    <Header />

    <Search @search-requested="searchByQuery" />

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
  async asyncData({ $api }) {
    const result = await $api.searchByQuery(INITIAL_SEARCH_KEY);
    const movies = result.Search;
    return { movies };
  },
  methods: {
    async searchByQuery(query) {
      if (query.length <= 0) {
        const result = await this.$api.searchByQuery(INITIAL_SEARCH_KEY);
        this.movies = result.Search;
      } else {
        const result = await this.$api.searchByQuery(query);
        this.movies = result.Search;
      }
    },
  },
};
</script>
