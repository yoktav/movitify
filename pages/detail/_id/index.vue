<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col col--md-4">
          <Poster
            :poster-src="movie.poster_path"
            :poster-alt="movie.title"
            :modifier-class="null"
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
  async asyncData({ params, $movieDBApi }) {
    try {
      const result = await $movieDBApi.searchById(params.id);
      const movie = result;

      return { movie };
    } catch (error) {
      throw new Error(error);
    }
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
