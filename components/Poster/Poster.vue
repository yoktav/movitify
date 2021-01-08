<template>
  <div class="c-poster" :class="modifierClass">
    <img :src="posterSrc" :alt="posterAlt" class="c-poster__image" />
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

<style lang="scss">
@import './Poster.scss';
</style>
