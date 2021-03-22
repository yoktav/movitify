import { mount, createLocalVue } from '@vue/test-utils';
import Search from './Search.vue';
import Vuex from 'vuex';
import { responseMovies } from '../../jest-config/responses';
import * as STORE_CONSTANTS from '../../store/constants';

const $movieDBApi = {
  searchByQuery: () => {
    return responseMovies.searchByQuery();
  },
};

const SEARCH_QUERY = responseMovies.searchByQuery().query;
const SEARCH_RESULTS = responseMovies.searchByQuery().results;

describe('Component Search.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let NuxtStore;
  let store;

  // Create Vuex store variables
  let searchQuery;

  // Import Vuex store
  beforeAll(async () => {
    const storePath = `${process.env.buildDir}/store.js`;
    NuxtStore = await import(storePath);
  });

  // Create Vuex store
  beforeEach(async () => {
    store = await NuxtStore.createStore();

    // Getters
    searchQuery = await store.getters[
      `${STORE_CONSTANTS.MODULE_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_SEARCH.GETTERS.GET_CURRENT_SEARCH_QUERY}`
    ];
  });

  describe('Check modifier_class working properly', () => {
    const modifierClasses = ['u-color-red', 'u-display-flex', 'u-align-items-center'];

    modifierClasses.forEach(modifierClass => {
      it(`Can modifierClass property have '${modifierClass}'`, () => {
        const wrapper = mount(Search, {
          store,
          localVue,
          propsData: {
            modifierClass: modifierClass,
          },
          data() {
            return {
              searchQuery,
            };
          },
        });

        expect(wrapper.classes()).toContain(modifierClass);
      });
    });
  });

  describe('Check inputs exist', () => {
    const inputNames = ['query', 'page'];

    inputNames.forEach(inputName => {
      it(`Does input[name="${inputName}"] exists`, () => {
        const wrapper = mount(Search, {
          store,
          localVue,
          data() {
            return {
              searchQuery,
            };
          },
        });

        expect(wrapper.find(`input[name="${inputName}"]`).exists()).toBe(true);
      });
    });
  });

  describe('Does autocomplete function working properly', () => {
    it('Check if autocompleteMovies array is empty', () => {
      const wrapper = mount(Search, {
        store,
        localVue,
        data() {
          return {
            searchQuery,
          };
        },
      });

      expect(wrapper.vm.autocompleteMovies).toEqual([]);
    });

    it('Run autocomplete() function when searchQuery is invalid', () => {
      const wrapper = mount(Search, {
        store,
        localVue,
        data() {
          return {
            searchQuery,
          };
        },
      });

      wrapper.vm.autocomplete();

      expect(wrapper.vm.autocompleteMovies).toEqual([]);
      expect(searchQuery).toBe(null);
    });

    it('Run autocomplete() function when searchQuery is valid', async () => {
      const wrapper = mount(Search, {
        store,
        localVue,
        mocks: {
          $movieDBApi,
        },
        data() {
          return {
            searchQuery,
          };
        },
      });

      // Set searchQuery
      await store.dispatch(
        `${STORE_CONSTANTS.MODULE_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_SEARCH.ACTIONS.SET_CURRENT_SEARCH_QUERY}`,
        SEARCH_QUERY,
      );

      searchQuery = await store.getters[
        `${STORE_CONSTANTS.MODULE_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_SEARCH.GETTERS.GET_CURRENT_SEARCH_QUERY}`
      ];

      wrapper.vm.searchQuery = searchQuery;
      await wrapper.vm.autocomplete();

      expect(searchQuery).toBe(SEARCH_QUERY);
      expect(wrapper.vm.autocompleteMovies).toEqual(SEARCH_RESULTS);
    });
  });

  //
  // TODO
  //
  // searchMovie() event.target.innerText aldigi icin duzgun calismiyor
  //

  it('Does searchMovie function working properly', async () => {
    const wrapper = mount(Search, {
      store,
      localVue,
      mocks: {
        $movieDBApi,
      },
      data() {
        return {
          searchQuery,
          autocompleteMovies: SEARCH_RESULTS,
        };
      },
    });

    expect(wrapper.vm.autocompleteMovies).toEqual(SEARCH_RESULTS);

    await wrapper.find('a').trigger('click');

    expect(wrapper.vm.autocompleteMovies).toEqual([]);
  });

  //
  // TODO
  //
  // Store'da movieDBApi.searchByQuery() bunu duzgun calistiramadim
  //

  it('Does handleForm function working properly', async () => {
    const wrapper = mount(Search, {
      store,
      localVue,
      mocks: {
        $movieDBApi,
      },
      data() {
        return {
          searchQuery,
        };
      },
    });

    // Set searchQuery
    await store.dispatch(
      `${STORE_CONSTANTS.MODULE_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_SEARCH.ACTIONS.SET_CURRENT_SEARCH_QUERY}`,
      SEARCH_QUERY,
    );

    searchQuery = await store.getters[
      `${STORE_CONSTANTS.MODULE_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_SEARCH.GETTERS.GET_CURRENT_SEARCH_QUERY}`
    ];
    wrapper.vm.searchQuery = searchQuery;

    // Store'da movieDBApi.searchByQuery() bunu duzgun calistiramadim
    // await store.dispatch('pages/search/setMovies', { query: 'Batman', page: 1 });
    // const movies = responseMovies.searchByQuery();
    // getStoreMovies = await store.getters['pages/search/getMovies'];

    // expect(getStoreMovies).toEqual(movies);
    expect(searchQuery).toBe(SEARCH_QUERY);
    expect(wrapper.vm.autocompleteMovies).toEqual([]);
  });

  //
  // TODO
  //
  // fonksiyon event parametresini alamadigi icin duzgun calismiyor
  //

  describe('Does openSearch function working properly', () => {
    it('When isSearchOpen set to false', async () => {
      const wrapper = mount(Search, {
        store,
        localVue,
        mocks: {
          $movieDBApi,
        },
        data() {
          return {
            searchQuery,
          };
        },
      });

      const currentSearchState = await store.getters[
        `${STORE_CONSTANTS.MODULE_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_SEARCH.GETTERS.GET_IS_SEARCH_OPEN}`
      ];

      expect(currentSearchState).toBe(false);

      // wrapper.vm.openSearch();

      // expect(currentSearchState).toBe(true);
    });

    it('When isSearchOpen set to true', async () => {
      await store.dispatch(
        `${STORE_CONSTANTS.MODULE_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_SEARCH.ACTIONS.SET_IS_SEARCH_OPEN}`,
        true,
      );

      const currentSearchState = await store.getters[
        `${STORE_CONSTANTS.MODULE_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_SEARCH.GETTERS.GET_IS_SEARCH_OPEN}`
      ];

      expect(currentSearchState).toBe(true);
    });
  });

  it('Run closeSearch() function when searchQuery is valid', async () => {
    const wrapper = mount(Search, {
      store,
      localVue,
      mocks: {
        $movieDBApi,
      },
      data() {
        return {
          searchQuery,
        };
      },
    });

    await wrapper.vm.closeSearch();

    const getIsSearchOpen = await store.getters[
      `${STORE_CONSTANTS.MODULE_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_SEARCH.GETTERS.GET_IS_SEARCH_OPEN}`
    ];

    const getCurrentSearchQuery = await store.getters[
      `${STORE_CONSTANTS.MODULE_SEARCH.BASE}/${STORE_CONSTANTS.MODULE_SEARCH.GETTERS.GET_CURRENT_SEARCH_QUERY}`
    ];

    expect(getIsSearchOpen).toBe(false);
    expect(getCurrentSearchQuery).toBe(null);
    expect(wrapper.vm.searchQuery).toBe(null);
    expect(wrapper.vm.autocompleteMovies).toEqual([]);
  });
});
