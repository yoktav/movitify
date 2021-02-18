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

      <p v-if="isMoviesLoading" class="u-color-info u-text-align-center u-padding-ends">
        Movies loading...
      </p>

      <p v-if="noNewMovieFound" class="u-color-info u-text-align-center u-padding-ends">
        That's All! Wanna make new search?
        <button class="u-text-decoration-underline" @click="makeNewSearch">Click Here!</button>
      </p>

      <p v-if="noMovieFound" class="u-color-warning u-text-align-center u-padding-ends">
        No movies found.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      pageNumber: this.$route.query.page,
    };
  },
  async fetch(context) {
    try {
      const { query, page } = context.route.query;
      context.store.dispatch('pages/search/clearMovies');
      await context.store.dispatch('pages/search/addMovies', { query, page });

    } catch (error) {
      throw new Error(error);
    }
  },
  computed: {
    movies() {
      return this.getMovies();
    },
    noNewMovieFound() {
      return this.getNoNewMovieFound();
    },
    noMovieFound() {
      return this.getNoMovieFound();
    },
    isMoviesLoading() {
      return this.getIsMoviesLoading();
    },
  },
  mounted: function () {
    document.addEventListener('scroll', this.handleScroll);
  },
  destroyed: function () {
    document.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapGetters({
      getMovies: 'pages/search/getMovies',
      isLastPage: 'pages/search/getIsLastPage',
      getNoMovieFound: 'pages/search/getNoMovieFound',
      getNoNewMovieFound: 'pages/search/getNoNewMovieFound',
      getIsMoviesLoading: 'pages/search/getIsMoviesLoading',
    }),
    ...mapActions({
      addMovies: 'pages/search/addMovies',
      isSearchOpen: 'search/setIsSearchOpen',
    }),
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
      if (this.isLastPage()) {
        return;
      }

      try {
        this.pageNumber++;

        await this.addMovies({ query: this.$route.query.query, page: this.pageNumber });

        // Not Working
        // let query = this.$route.query;
        // query.page = this.pageNumber.toString();
        // console.log(query);
        // this.$router.push({ path: '/search', query: query });


        this.$router.push({
          path: 'search',
          query: { query: this.$route.query.query, page: `${this.pageNumber}` },
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    makeNewSearch() {
      const searchComponent = document.querySelector('.js-search');

      this.$smoothScroll({
        offset: -200,
        updateHistory: false,
        scrollTo: searchComponent,
      });

      searchComponent.querySelector('input').value = null;

      this.isSearchOpen(true);
      searchComponent.querySelector('input').focus();
    },
  },
};
</script>
