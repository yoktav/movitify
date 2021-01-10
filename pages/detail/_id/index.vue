<template>
  <div>
    <Header />

    <div class="container">
      <p v-if="isLoading">Loading</p>

      <div class="row">
        <div class="col col--md-4">
          <Poster
            :poster-src="movie.Poster"
            :poster-alt="movie.Plot"
            :modifier-class="posterModifierClass"
          />
        </div>

        <div class="col col--md-8">
          <h1>{{ movie.Title }}</h1>

          <p class="u-margin-ends-large">
            Description:
            <br />
            {{ movie.Plot }}
          </p>

          <div class="c-font-weight-700">IMDB Rating: {{ movie.imdbRating }}</div>
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
      default: 'Movie',
    },
    description: {
      type: String,
      default: 'Movie Plot',
    },
  },
  data() {
    return {
      isLoading: true,
      movie: [],
    };
  },
  head() {
    return {
      title: this.movie.Title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.movie.Plot,
        },
      ],
    };
  },
  async created() {
    this.searchById(this.$route.params.id);
  },
  methods: {
    async searchById(query) {
      const result = await this.$api.searchById(query);
      this.movie = result;
    },
  },
};
</script>

<style></style>
