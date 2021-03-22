import { shallowMount, createLocalVue } from '@vue/test-utils';
import Poster from './Header.vue';

describe('Component Header.vue', () => {
  const localVue = createLocalVue();

  describe('Check modifierClass working properly', () => {
    const modifierClasses = ['u-color-red', 'u-display-flex', 'u-align-items-center'];

    modifierClasses.forEach(modifierClass => {
      it(`Can modifierClass property have '${modifierClass}'`, () => {
        const wrapper = shallowMount(Poster, {
          localVue,
          propsData: {
            modifierClass: modifierClass,
          },
        });

        expect(wrapper.classes()).toContain(modifierClass);
      });
    });
  });
});
