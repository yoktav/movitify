import { mount, createLocalVue } from '@vue/test-utils';
import Poster from './Icon.vue';

describe('Component Icon.vue', () => {
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

  it('Check iconName working properly', () => {
    const ICON_NAME = 'search';

    const wrapper = mount(Poster, {
      localVue,
      propsData: {
        iconName: ICON_NAME,
      },
    });

    expect(wrapper.html().includes(`${ICON_NAME} icon`)).toBe(true);
  });
});
