<template>
  <header class="c-header" :class="modifierClass">
    <div class="container">
      <div class="c-header__inner">
        <NuxtLink to="/" class="c-header__logo">Movitify</NuxtLink>

        <Search />
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
};
</script>

<style lang="scss" scoped>
@import './Header';
</style>
