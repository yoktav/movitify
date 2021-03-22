<template>
  <div>
    <div class="container">
      <div v-if="movies && movies.length" class="row">
        <div v-for="(movie, i) in movies" :key="i" class="col col--md-3">
          <MovieCard
            :id="movie.id"
            :modifier-class="null"
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
import * as STORE_CONSTANTS from '~/store/constants';

export default {
  data() {
    return {
      pageNumber: this.$route.query.page,
    };
  },
  async fetch(context) {
    try {
      const { query, page } = context.route.query;
      context.store.dispatch(
        `${STORE_CONSTANTS.MODULE_PAGES.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.ACTIONS.CLEAR_MOVIES}`,
      );
      await context.store.dispatch(
        `${STORE_CONSTANTS.MODULE_PAGES.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.ACTIONS.ADD_MOVIES}`,
        { query, page },
      );
    } catch (error) {
      throw new Error(error);
    }
  },
  head() {
    return {
      title: `Search results for '${this.$route.query.query}'`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Search results for '${this.$route.query.query}'`,
        },
      ],
    };
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
      getMovies: `${STORE_CONSTANTS.MODULE_PAGES.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.GETTERS.GET_MOVIES}`,
      isLastPage: `${STORE_CONSTANTS.MODULE_PAGES.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.GETTERS.GET_IS_LAST_PAGE}`,
      getNoMovieFound: `${STORE_CONSTANTS.MODULE_PAGES.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.GETTERS.GET_NO_MOVIE_FOUND}`,
      getNoNewMovieFound: `${STORE_CONSTANTS.MODULE_PAGES.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.GETTERS.GET_NO_NEW_MOVIE_FOUND}`,
      getIsMoviesLoading: `${STORE_CONSTANTS.MODULE_PAGES.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.GETTERS.GET_IS_MOVIES_LOADING}`,
    }),
    ...mapActions({
      addMovies: `${STORE_CONSTANTS.MODULE_PAGES.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_PAGES_SEARCH.ACTIONS.ADD_MOVIES}`,
      isSearchOpen: `${STORE_CONSTANTS.MODULE_SEARCH}/${STORE_CONSTANTS.MODULE_SEARCH.SET_IS_SEARCH_OPEN}`,
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

        // TODO
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
