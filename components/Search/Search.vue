<template>
  <div ref="searchComponent" class="c-search js-search" :class="{ 'is-open': isSearchOpen }">
    <form action="/search" class="c-search__form" :class="modifierClass" autocomplete="off">
      <button type="submit" class="c-search__submit" @click="openSearch">
        <Icon :modifier-class="iconModifierClass" icon-name="Search"><IconSearch /></Icon>
      </button>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Type here..."
        name="q"
        class="c-search__input"
        @keyup="autocomplete"
        @keypress.enter="handleForm"
      />

      <input type="text" name="page" value="1" class="u-display-none" />

      <button type="button" class="c-search__close" @click="closeSearch">
        <Icon :modifier-class="null" icon-name="Close"><IconClose /></Icon>
      </button>
    </form>

    <transition name="autocomplete">
      <ul v-if="autocompleteMovies.length > 0" class="c-search__result-list">
        <li v-for="(movie, i) in autocompleteMovies.slice(0, MAXIMUM_SEEN_RESULT_NUMBER)" :key="i">
          <NuxtLink :to="`/search?q=${movie.title}&page=1`" @click.native="searchMovie">
            {{ movie.title }}
          </NuxtLink>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    modifierClass: {
      type: String,
      default: null,
    },
    iconModifierClass: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      searchQuery: this.currentSearchQuery(),
      autocompleteMovies: [],
      MAXIMUM_SEEN_RESULT_NUMBER: 7,
    };
  },
  computed: {
    isSearchOpen() {
      return this.getIsSearchOpen();
    },
  },
  watch: {
    searchQuery: function (newQuery) {
      this.setCurrentSearchQuery(newQuery);
    },
  },
  methods: {
    ...mapGetters({
      currentSearchQuery: 'search/getCurrentSearchQuery',
      getIsSearchOpen: 'search/getIsSearchOpen',
    }),
    ...mapActions({
      setMovies: 'pages/search/setMovies',
      setIsSearchOpen: 'search/setIsSearchOpen',
      setCurrentSearchQuery: 'search/setCurrentSearchQuery',
    }),
    async autocomplete() {
      // Do not do something if searchQuery is empty
      if (!this.searchQuery || this.searchQuery === '') {
        this.autocompleteMovies = [];
        return;
      }

      const moviesResult = await this.$movieDBApi.searchByQuery(this.searchQuery);
      this.autocompleteMovies = moviesResult.results;
    },
    handleForm(event) {
      this.autocompleteMovies = [];
      event.preventDefault();

      this.$router.push({
        path: '/search',
        query: { q: this.searchQuery, page: 1 },
      });

      this.setMovies([this.searchQuery, 1]);
    },
    searchMovie(event) {
      this.searchQuery = event.target.innerText;
      this.autocompleteMovies = [];

      this.setMovies([this.searchQuery, 1]);
    },
    openSearch(event) {
      if (this.isSearchOpen === true) {
        this.handleForm(event);
        return;
      }

      event.preventDefault();
      this.$el.querySelector('input').focus();
      this.setIsSearchOpen(true);
      document.addEventListener('click', this.handleDocumentClick);
    },
    closeSearch() {
      this.setIsSearchOpen(false);
      this.searchQuery = null;
      this.autocompleteMovies = [];
    },
    handleDocumentClick(event) {
      let searchComponent = this.$refs.searchComponent;
      let target = event.target;

      if (searchComponent !== target && !searchComponent.contains(target)) {
        this.closeSearch();
        document.removeEventListener('click', this.handleDocumentClick);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Search';
@import '../../assets/styles/abstracts/index';

.autocomplete-enter-active,
.autocomplete-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: $g-transition-timing-function;
}

.autocomplete-enter,
.autocomplete-leave-to {
  opacity: 0;
}
</style>
