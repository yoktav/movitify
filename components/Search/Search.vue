<template>
  <div class="c-search js-search" :class="{ 'is-open': isSearchOpen }">
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
      />

      <input type="text" name="page" value="1" class="u-display-none" />

      <button type="button" class="c-search__close" @click="closeSearch">
        <Icon :modifier-class="null" icon-name="Close"><IconClose /></Icon>
      </button>
    </form>

    <ul v-if="autocompleteMovies" class="c-search__result-list">
      <li v-for="(movie, i) in autocompleteMovies.slice(0, 7)" :key="i" class="">
        <NuxtLink :to="'/search?q=' + movie.title" @click.native="searchMovie">{{
          movie.title
        }}</NuxtLink>
      </li>
    </ul>
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
      debounce: null,
    };
  },
  computed: {
    isSearchOpen() {
      return this.getIsSearchOpen();
    },
  },
  methods: {
    ...mapGetters({
      currentSearchQuery: 'search/getCurrentSearchQuery',
      getIsSearchOpen: 'search/getIsSearchOpen',
    }),
    ...mapActions({
      setMovies: 'movies/setMovies',
      setIsSearchOpen: 'search/setIsSearchOpen',
      setCurrentSearchQuery: 'search/setCurrentSearchQuery',
    }),
    autocomplete() {
      // Do not do something if searchQuery is empty
      if (this.searchQuery === null || this.searchQuery.length <= 0) {
        this.autocompleteMovies = null;
        return;
      }

      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        const moviesResult = await this.$movieDBApi.searchByQuery(this.searchQuery);
        this.autocompleteMovies = moviesResult.results;

        this.setSearchQuery(this.searchQuery);
      }, 100);
    },
    searchMovie(event) {
      const searchValue = event.target.innerText;

      this.setMovies([this.searchQuery, 3]);

      this.setSearchQuery(searchValue);

      this.autocompleteMovies = null;
    },
    openSearch(event) {
      if (this.isSearchOpen === true) {
        return;
      }

      event.preventDefault();
      this.$el.querySelector('input').focus();
      this.setIsSearchOpen(true);
    },
    closeSearch() {
      this.setIsSearchOpen(false);
      this.clearSearchQuery();
      this.autocompleteMovies = null;
    },
    clearSearchQuery() {
      this.setCurrentSearchQuery(null);
      this.searchQuery = this.currentSearchQuery();
    },
    setSearchQuery(query) {
      this.setCurrentSearchQuery(query);
      this.searchQuery = query;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Search';
</style>
