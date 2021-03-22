import { mount, createLocalVue } from '@vue/test-utils';
import Poster from './Poster.vue';

describe('Component Poster.vue', () => {
  const localVue = createLocalVue();

  describe('Check modifierClass working properly', () => {
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

  describe('Check posterAlt working properly', () => {
    const imageAlts = ['Movie Poster', 'Series Poster', 'Actor Poster'];

    imageAlts.forEach(imageAlt => {
      it(`is posterAlt can have '${imageAlt}'`, () => {
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

  describe('Check posterSrc working properly', () => {
    const posterSrcSets = ['/dummpy.png', '/dummpy.svg', '/dummpy.mp4'];

    posterSrcSets.forEach(posterSrc => {
      it(`is posterSrc can have '${posterSrc}'`, () => {
        const wrapper = mount(Poster, {
          localVue,
          propsData: {
            posterSrc,
            posterAlt: '',
          },
        });

        const img = wrapper.find('img');
        const srcAttribute = img.attributes('data-src');

        // Can check this due to nuxt-lazy-load triggers only when element is visible /// to user
        //
        // const imageErrorFallback = jest.spyOn(wrapper.vm, 'imageErrorFallback');
        // if (posterSrc.includes('mp4')) {
        //   expect(imageErrorFallback).toHaveBeenCalled();
        // }

        expect(srcAttribute).toContain(posterSrc);
      });
    });
  });
});
