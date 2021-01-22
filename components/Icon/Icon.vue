<template>
  <svg
    class="c-icon"
    :class="modifierClass"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title>{{ iconName }} icon</title>
    <slot />
  </svg>
</template>

<script>
export default {
  props: {
    modifierClass: {
      type: String,
      default: null,
    },
    iconName: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>

<style lang="scss">
@import './Icon';
</style>
