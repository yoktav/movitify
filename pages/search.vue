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

      <p v-if="noNewMovieState" class="u-color-info u-text-align-center u-padding-ends">
        That's All! Wanna make new search?
        <button class="u-text-decoration-underline" @click="makeNewSearch">Click Here!</button>
      </p>

      <p v-if="noMovieFoundState" class="u-color-warning u-text-align-center u-padding-ends">
        No movies found.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNumber: this.$route.query.page,
    };
  },
  async fetch(context) {
    await context.store.dispatch('movies/setMovies', [
      context.route.query.q,
      context.route.query.page,
    ]);
    context.store.dispatch('search/setCurrentSearchQuery', context.route.query.q);
  },
  computed: {
    movies() {
      return this.$store.getters['movies/getMovies'];
    },
    noNewMovieState() {
      return this.$store.getters['movies/getNoNewMovieState'];
    },
    noMovieFoundState() {
      return this.$store.getters['movies/getNoMovieFoundState'];
    },
  },
  mounted: function () {
    document.addEventListener('scroll', this.handleScroll);
  },
  destroyed: function () {
    document.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (
        Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) +
          window.innerHeight >=
        document.documentElement.offsetHeight
      ) {
        this.loadMoreMovies();
      }
    },
    async loadMoreMovies() {
      if (this.$store.getters['movies/getIsLastPage']) {
        return;
      }

      this.pageNumber++;

      await this.$store.dispatch('movies/addMovies', [this.$route.query.q, this.pageNumber]);

      // Not Working
      // let query = this.$route.query;
      // query.page = this.pageNumber.toString();
      // console.log(query);
      // this.$router.push({ path: '/search', query: query });

      this.$router.push({
        path: 'search',
        query: { q: this.$route.query.q, page: `${this.pageNumber}` },
      });
    },
    makeNewSearch() {
      const searchComponent = this.$el.querySelector('.js-search');

      this.$smoothScroll({
        offset: -200,
        updateHistory: false,
        scrollTo: searchComponent,
      });

      this.$store.dispatch('search/setCurrentSearchQuery', null);
      searchComponent.querySelector('input').value = null;

      this.$store.dispatch('search/setIsSearchOpen', true);
      searchComponent.querySelector('input').focus();
    },
  },
};
</script>
