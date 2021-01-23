<template>
  <header class="c-header" :class="modifierClass">
    <div class="container">
      <div class="c-header__inner">
        <NuxtLink to="/" class="c-header__logo">Movitify</NuxtLink>

        <Search @search-requested="searchByQuery" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    modifierClass: {
      type: String,
      default: null,
    },
  },
  methods: {
    async searchByQuery(query) {
      if (query.length <= 0) {
        this.$store.dispatch('movies/setMovies', 'harry');
      } else {
        this.$store.dispatch('movies/setMovies', query);
      }
    },
  },
};
</script>

<style lang="scss">
@import './Header';
</style>
