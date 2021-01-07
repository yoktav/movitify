<template>
  <div>
    <Header />

    <div class="container">

      <p v-if="isLoading">Loading</p>

      <div class="row">
        <div class="col col--md-3" v-for="movie in movies" :key="movie.imdbID">
          <MovieCard :posterSrc="movie.Poster" :posterAlt="movie.Title" :title="movie.Title" :id="movie.imdbID" />
        </div>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      isLoading: true,
      movies: [],
    };
  },
  created() {
    this.searchMovie('harry-potter');
  },
};
</script>
