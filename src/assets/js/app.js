document.addEventListener("DOMContentLoaded", () => {

  if (document.querySelector('.main-swiper') && document.querySelector('.main-swiper-btns')) {
    const swiper = new Swiper('.main-swiper', {
      effect: 'fade',
      direction: 'horizontal',
      speed: 1000,
      spaceBetween: 100,
      loop: true,
      allowTouchMove: false,
    });

    class SliderController {
      constructor(container, swiper) {
        this.container = document.querySelector(container);
        this.btnsList = [...this.container.children];
        this.swiper = swiper;
        this.init();
      }

      init() {
        this.btnsList.forEach((btn, index) => {
          btn.onclick = () => {
            this.setActive(btn);
            this.swiper.slideTo(index);
          };
        })
      }

      setActive(btn) {
        this.btnsList.forEach(item => {
          if (item === btn) {
            btn.classList.add('_active');
          } else {
            item.classList.remove('_active');
          }
        })
      }
    }

    new SliderController('.main-swiper-btns', swiper);
  }

})