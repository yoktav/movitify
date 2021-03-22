import { mount, createLocalVue } from '@vue/test-utils';
import Poster from './MovieCard.vue';

describe('Component MovieCard.vue', () => {
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

  it('Check title working properly', () => {
    const TITLE = 'Custom Title';

    const wrapper = mount(Poster, {
      localVue,
      propsData: {
        title: TITLE,
      },
    });

    const title = wrapper.find('.c-movie-card__title');

    expect(title.text()).toEqual(TITLE);
  });

  it('Check NuxtLink href working properly', () => {
    const wrapper = mount(Poster, {
      localVue,
      propsData: {
        id: 2,
      },
    });

    const link = wrapper.vm.$refs.movieCardLink;
    const linkHref = link.$options.propsData.to;

    expect(linkHref).toEqual('detail/2');
  });
});
