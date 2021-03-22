import { mount, createLocalVue } from '@vue/test-utils';
import Poster from './Poster.vue';

describe('Component Poster.vue', () => {
  const localVue = createLocalVue();

  describe('Check modifier_class working properly', () => {
    const modifierClasses = ['u-color-red', 'u-display-flex', 'u-align-items-center'];

    modifierClasses.forEach(modifierClass => {
      it(`Can modifierClass property have '${modifierClass}'`, () => {
        const wrapper = mount(Poster, {
          localVue,
          propsData: {
            modifierClass: modifierClass,
          },
        });

        expect(wrapper.classes()).toContain(modifierClass);
      });
    });
  });

  describe('Check imageAlt working properly', () => {
    const imageAlts = ['Movie Poster', 'Series Poster', 'Actor Poster'];

    imageAlts.forEach(imageAlt => {
      it(`is imageAltc can have '${imageAlt}'`, () => {
        const wrapper = mount(Poster, {
          localVue,
          propsData: {
            posterSrc: '',
            posterAlt: imageAlt,
          },
        });

        const img = wrapper.find('img');
        const altAttribute = img.attributes('alt');

        expect(altAttribute).toContain(imageAlt);
      });
    });
  });
});
