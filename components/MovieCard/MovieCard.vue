<template>
  <div class="c-movie-card">
    <Poster :poster-src="posterSrc" :poster-alt="posterAlt" :modifier-class="PosterModifierClass" />

    <div class="c-movie-card__content">
      <h3 class="c-movie-card__title">{{ title }}</h3>

      <div class="c-movie-card__meta">
        <NuxtLink class="c-movie-card__link" :to="'detail/' + id">
          see details

          <Icon :modifier-class="IconModifierClass" icon-name="Link"><IconExternal /></Icon>
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
    title: {
      type: String,
      default: 'Movie Title',
    },
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      PosterModifierClass: 'c-movie-card__poster',
      IconModifierClass: 'u-margin-left-xsmall',
    };
  },
};
</script>

<style lang="scss">
@import './c-movie-card.scss';
</style>
