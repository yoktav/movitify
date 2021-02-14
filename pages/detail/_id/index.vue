<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col col--md-4">
          <Poster
            :poster-src="movie.poster_path"
            :poster-alt="movie.title"
            :modifier-class="posterModifierClass"
          />
        </div>

        <div class="col col--md-8">
          <h1>{{ movie.title }}</h1>

          <p class="u-margin-ends-large">
            Description:
            <br />
            {{ movie.overview }}
          </p>

          <div class="c-font-weight-700">Vote Average: {{ movie.vote_average }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posterModifierClass: {
      type: String,
      default: null,
    },
  },
  async asyncData({ params, $movieDBApi }) {
    const result = await $movieDBApi.searchById(params.id);
    const movie = result;

    return { movie };
  },
  head() {
    return {
      title: this.movie.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.movie.overview,
        },
      ],
    };
  },
};
</script>

<style></style>
