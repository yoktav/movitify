import { mount } from '@vue/test-utils';
import Poster from './Poster.vue';

describe('Poster.vue', () => {
  const modifierClasses = ['u-color-red', 'u-display-flex', 'u-align-items-center'];
  modifierClasses.forEach(modifierClass => {
    it(`is modifierClass property can have '${modifierClass}'`, () => {
      const wrapper = mount(Poster, {
        propsData: {
          modifierClass: modifierClass,
        },
      });
      expect(wrapper.classes()).toContain(modifierClass);
    });
  });

  const imageAlts = ['Movie Poster', 'Series Poster', 'Actor Poster'];
  imageAlts.forEach(imageAlt => {
    it(`is imageAltc can have '${imageAlt}'`, () => {
      const wrapper = mount(Poster, {
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
