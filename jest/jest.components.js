//
// Imports
//

import Vue from 'vue';

import Header from '../components/Header/Header.vue';
import Icon from '../components/Icon/Icon.vue';
import MovieCard from '../components/MovieCard/MovieCard.vue';
import Poster from '../components/Poster/Poster.vue';
import Search from '../components/Search/Search.vue';

//
// Components
//

Vue.component('Header', Header);
Vue.component('Icon', Icon);
Vue.component('MovieCard', MovieCard);
Vue.component('Poster', Poster);
Vue.component('Search', Search);
Vue.component('NuxtLink', {
  props: {
    to: {
      type: String,
      required: true,
      default: '',
    },
  },
  template: '<a href="#"><slot>NuxtLink</slot></a>',
});

//
// Directives
//

Vue.directive('lazy-load', {});
