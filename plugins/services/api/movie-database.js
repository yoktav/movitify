import Vue from 'vue';
import axios from 'axios';

const BASE_URL = 'https://www.omdbapi.com';
const API_KEY = process.env.NUXT_ENV_OMDB_API_KEY;

const END_POINTS = {
  search: `${BASE_URL}/?apikey=${API_KEY}&s`,
  searchByID: `${BASE_URL}/?apikey=${API_KEY}&i`,
};

Vue.mixin({
  methods: {
    async fetchData(url) {
      const config = {
        headers: {
          Accept: 'application/json',
        },
      };

      try {
        const response = await axios.get(url, config);

        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    failureCallback(response) {
      throw new Error(response);
    },
    searchMovie(search_key) {
      const url = `${END_POINTS.search}=${search_key}`;

      const promise = this.fetchData(url);

      promise.then(response => {
        this.movies = response.Search;
        this.isLoading = false;
      }, this.failureCallback);
    },
    searchByID(id) {
      const url = `${END_POINTS.searchByID}=${id}`;

      const promise = this.fetchData(url);

      promise.then(response => {
        this.movie = response;
        this.isLoading = false;
      }, this.failureCallback);
    },
  },
});
