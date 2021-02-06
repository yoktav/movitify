<template>
  <div class="c-movie-card">
    <Poster :poster-src="posterSrc" :poster-alt="posterAlt" :modifier-class="posterModifierClass" />

    <div class="c-movie-card__content">
      <h3 class="c-movie-card__title">{{ title }}</h3>

      <div class="c-movie-card__meta">
        <NuxtLink class="c-movie-card__link" :to="'detail/' + id">
          see details

          <Icon :modifier-class="iconModifierClass" icon-name="Link"><IconExternal /></Icon>
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
    posterModifierClass: {
      type: String,
      default: 'c-movie-card__poster',
    },
    iconModifierClass: {
      type: String,
      default: 'u-margin-left-xsmall',
    },
  },
};
</script>

<style lang="scss">
@import './MovieCard';
</style>
