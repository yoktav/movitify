<template>
  <div class="c-search" :class="{ 'is-open': isSearchOpen }">
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
      searchQuery: this.$store.getters['search/getCurrentSearchQuery'],
      autocompleteMovies: [],
    };
  },
  computed: {
    isSearchOpen() {
      return this.$store.getters['search/getIsSearchOpen'];
    },
  },
  methods: {
    async autocomplete() {
      // Do not do something if searchQuery is empty
      if (this.searchQuery === null || this.searchQuery.length <= 0) {
        this.autocompleteMovies = null;
        return;
      }

      const moviesResult = await this.$movieDBApi.searchByQuery(this.searchQuery);
      this.autocompleteMovies = moviesResult.results;

      this.setSearchQuery(this.searchQuery);
    },
    searchMovie(event) {
      const searchValue = event.target.innerText;

      this.$store.dispatch('movies/setMovies', this.searchQuery);

      this.setSearchQuery(searchValue);

      this.autocompleteMovies = null;
    },
    openSearch(event) {
      if (this.isSearchOpen === true) {
        return;
      }

      event.preventDefault();
      this.$el.querySelector('input').focus();
      this.$store.dispatch('search/setIsSearchOpen', true);
    },
    closeSearch() {
      this.$store.dispatch('search/setIsSearchOpen', false);
      this.clearSearchQuery();
      this.autocompleteMovies = null;
    },
    clearSearchQuery() {
      this.$store.dispatch('search/setCurrentSearchQuery', null);
      this.searchQuery = this.$store.getters['search/getCurrentSearchQuery'];
    },
    setSearchQuery(query) {
      this.$store.dispatch('search/setCurrentSearchQuery', query);
      this.searchQuery = query;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Search';
</style>
