document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector('.main-swiper-btns')) {
    class SliderController {
      constructor(container) {
        this.container = document.querySelector(container);
        this.btnsList = [...this.container.children];
        this.init();
      }

      init() {
        this.btnsList.forEach(btn => {
          btn.onclick = () => this.setActive(btn);
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

    new SliderController('.main-swiper-btns');
  }
})