<template>
  <div>
    <div class="container">
      <div v-if="movies && movies.length" class="row">
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
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  transition: 'home',
  async fetch(context) {
    try {
      await context.store.dispatch('pages/home/setMovies', ['harry', 1]);
    } catch (error) {
      throw new Error(error);
    }
  },
  computed: {
    movies() {
      return this.getHomeMovies();
    },
  },
  methods: {
    ...mapGetters({
      getHomeMovies: 'pages/home/getMovies',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/abstracts/index';

.home-enter-active,
.home-leave-active {
  transition-duration: 0.8s;
  transition-property: opacity, transform;
  transition-timing-function: $g-transition-timing-function;
}

.home-enter,
.home-leave-to {
  opacity: 0;
  transform: translateY(-15px); // stylelint-disable-line meowtec/no-px
}
</style>
