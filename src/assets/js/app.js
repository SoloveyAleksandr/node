document.addEventListener("DOMContentLoaded", () => {

  if (document.querySelector('.main-swiper') && document.querySelector('.main-swiper-btns')) {
    const swiper = new Swiper('.main-swiper', {
      effect: 'fade',
      direction: 'horizontal',
      speed: 1000,
      spaceBetween: 100,
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

  if (document.querySelector('.main-form-select')) {
    class Select {
      constructor(wrapper) {
        this.select = document.querySelector(wrapper);
        this.btn = this.select.querySelector('.main-form-select__btn');
        this.list = this.select.querySelector('.main-form-select-list');
        this.value = this.select.querySelector('.main-form-select__value');
        this.isOpen = false;
        this.init();
      }

      init() {
        this.getListHeight();
        this.btn.onclick = (e) => this.toggleList.call(this, e);
        [...this.list.children].forEach(item => {
          const btn = item.querySelector('.main-form-select-list-item__btn');
          btn.onclick = this.setValue.bind(this, btn);
        })
        document.onclick = this.closeList.bind(this);
      }

      getListHeight() {
        this.listHeight = [...this.list.children].reduce((acc, item) => {
          return acc += item.offsetHeight;
        }, 0) / 10;
      }

      toggleList(e) {
        e.stopPropagation();
        this.isOpen ? this.closeList() : this.openList();
      }

      closeList() {
        this.list.style.maxHeight = 0;
        this.isOpen = false;
      }

      openList() {
        this.list.style.maxHeight = `${this.listHeight}rem`;
        this.isOpen = true;
      }

      setValue(btn) {
        this.btn.innerText = btn.innerText;
        this.btn.classList.remove('_placeholder')
        this.value.value = btn.dataset.value;
      }
    }

    new Select('.main-form-select');
  }

})