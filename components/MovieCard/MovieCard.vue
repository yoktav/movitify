<template>
  <div class="c-movie-card" :class="modifierClass">
    <Poster
      :poster-src="posterSrc"
      :poster-alt="posterAlt"
      :modifier-class="'c-movie-card__poster'"
    />

    <div class="c-movie-card__content">
      <h3 class="c-movie-card__title">{{ title }}</h3>

      <div class="c-movie-card__meta">
        <NuxtLink class="c-movie-card__link" :to="`detail/${id}`">
          see details

          <Icon :modifier-class="'u-margin-left-xsmall'" icon-name="Link"><IconExternal /></Icon>
        </NuxtLink>
      </div>
    </div>
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
      default: 'Poster Image',
    },
    id: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: 'Movie Title',
    },
    modifierClass: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './MovieCard';
</style>
