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

      <p v-if="noMovieFoundState" class="u-color-warning u-text-align-center u-padding-ends">
        No movies found.
      </p>

      <p v-if="noNewMovieState" class="u-color-info u-text-align-center u-padding-ends">
        That's All!
      </p>
    </div>
  </div>
</template>

<script>
let pageNumber = 1;

export default {
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
    document.addEventListener('scroll', () => this.handleScroll());
  },
  methods: {
    handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.loadMoreMovies();
      }
    },
    async loadMoreMovies() {
      if (this.$store.getters['movies/isLastPage']) {
        return;
      }

      pageNumber++;

      await this.$store.dispatch('movies/addMovies', [this.$route.query.q, pageNumber]);

      // Not Working
      // let query = this.$route.query;
      // query.page = pageNumber.toString();
      // console.log(query);
      // this.$router.push({ path: '/search', query: query });

      this.$router.push({
        path: 'search',
        query: { q: this.$route.query.q, page: `${pageNumber}` },
      });
    },
  },
};
</script>
