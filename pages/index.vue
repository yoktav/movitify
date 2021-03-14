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
import * as STORE_CONSTANTS from '~/store/constants';

export default {
  name: 'App',
  transition: 'home',
  async fetch(context) {
    try {
      await context.store.dispatch(
        `${STORE_CONSTANTS.MODULE_PAGES.BASE}/${STORE_CONSTANTS.MODULE_PAGES_HOME.BASE}/${STORE_CONSTANTS.MODULE_PAGES_HOME.ACTIONS.SET_MOVIES}`,
        {
          query: 'iron',
          page: 1,
        },
      );
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
      getHomeMovies: `${STORE_CONSTANTS.MODULE_PAGES.BASE}/${STORE_CONSTANTS.MODULE_PAGES_HOME.BASE}/${STORE_CONSTANTS.MODULE_PAGES_HOME.GETTERS.GET_MOVIES}`,
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
