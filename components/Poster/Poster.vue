<template>
  <div class="c-poster" :class="[posterSrc === null ? 'is-undefined' : '', modifierClass]">
    <img
      v-if="posterSrc !== null"
      v-lazy-load
      :data-src="`https://image.tmdb.org/t/p/w500${posterSrc}`"
      :alt="posterAlt"
      class="c-poster__image"
    />

    <Icon
      v-if="posterSrc === null"
      :modifier-class="null"
      class="c-poster__icon"
      icon-name="No Image Found"
      ><IconImage
    /></Icon>
  </div>
</template>

<script>
export default {
  props: {
    posterSrc: {
      type: String,
      default: null,
    },
    posterAlt: {
      type: String,
      default: 'Poster',
    },
    modifierClass: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Poster';
</style>
