//
// Imports
//

import Vue from 'vue';

import Header from './Header/Header.vue';
import Icon from './Icon/Icon.vue';
import MovieCard from './MovieCard/MovieCard.vue';
import Poster from './Poster/Poster.vue';
import Search from './Search/Search.vue';

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
