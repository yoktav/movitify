<template>
  <form class="c-search" :class="modifierClass">
    <input
      v-model="query"
      type="text"
      placeholder="Type here..."
      class="c-search__input"
      @keyup="handleSearch"
    />
    <button class="c-search__button" @click="handleSearch">
      <Icon :modifier-class="iconModifierClass" icon-name="Search"><IconSearch /></Icon>
    </button>
  </form>
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
      query: '',
    };
  },
  methods: {
    handleSearch(event) {
      event.preventDefault();
      this.$emit('search-requested', this.query);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Search';
</style>
