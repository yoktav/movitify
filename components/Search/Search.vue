<template>
  <div class="c-search">
    <form action="/search" class="c-search__form" :class="modifierClass" autocomplete="off">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Type here..."
        name="q"
        class="c-search__input"
        @keyup="autocomplete"
        @click="searchMovie"
      />

      <button type="submit" class="c-search__button">
        <Icon :modifier-class="iconModifierClass" icon-name="Search"><IconSearch /></Icon>
      </button>
    </form>

    <ul v-if="autocompleteMovies" class="c-search__result-list">
      <li v-for="(movie, i) in autocompleteMovies.slice(0, 7)" :key="i" class="">
        <NuxtLink :to="'/search?q=' + movie.title" @click.native="goToMovie">{{
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
      searchQuery: this.$store.getters['movies/getCurrentSearchQuery'],
      autocompleteMovies: [],
    };
  },
  methods: {
    async autocomplete() {
      // Early exit
      if (this.searchQuery === null || this.searchQuery.length <= 0) {
        return;
      }

      const moviesResult = await this.$movieDBApi.searchByQuery(this.searchQuery);
      this.autocompleteMovies = moviesResult.results;

      this.$store.dispatch('movies/setCurrentSearchQuery', this.searchQuery);
    },
    goToMovie(event) {
      const searchValue = event.target.innerText;

      this.$store.dispatch('movies/setCurrentSearchQuery', searchValue);
      this.$store.dispatch('movies/setMovies', this.searchQuery);

      this.searchQuery = searchValue;
    },
    searchMovie() {
      // Early exit
      if (this.searchQuery === null || this.searchQuery.length <= 0) {
        return;
      }

      this.$store.dispatch('movies/setMovies', this.searchQuery);
      this.$router.push({
        path: `/search?q=${this.searchQuery}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Search';
</style>
