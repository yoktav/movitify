<template>
  <div>
    <Header />

    <div class="container">
      <p v-if="isLoading">Loading</p>

      <div class="row">
        <div class="col col--md-4">
          <Poster :posterSrc="movie.Poster" :posterAlt="movie.Plot" :modifierClass="PosterModifierClass" />
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
import axios from "axios";

export default {
  props: {
    PosterModifierClass: {
      type: String
    },
    posterSrc: {
      type: String
    },
    posterAlt: {
      type: String,
      default: 'Poster Image'
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    }
  },
  data() {
    return {
      isLoading: true,
      movie: [],
    };
  },
  async created() {
    this.searchByID(this.$route.params.id);
  },
  head() {
    return {
      title: this.movie.Title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.movie.Plot,
        }
      ]
    };
  }
};
</script>

<style>
</style>
