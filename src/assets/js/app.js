document.addEventListener("DOMContentLoaded", () => {

  class SwiperController {
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


  // LOADER 
  const BODY = document.querySelector('body');
  const LOADER = document.querySelector('.loader');
  if (LOADER) {
    const tl = gsap.timeline({
      onComplete: () => {
        LOADER.classList.remove('_active');
      }
    });
    tl.to('.loader-text', {
      delay: 1,
      duration: 2,
      text: 'NODE.',
      ease: "none.none"
    })
  }
  // <==

  // HEADER
  if (document.querySelector('.header')) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: BODY,
        start: "top top",
        end: "+=200rem",
        scrub: true,
      }
    })
      .to('.header-info', {
        height: 0,
        y: '-10rem',
      })
      .to('.header-logo', {
        margin: 0,
        height: '4rem',
      })
      .to('.header', {
        duration: 1,
        boxShadow: '0 0.1rem 1rem rgba(0, 0, 0, 0.15)',
      })
  }
  // <==

  // FORM
  if (document.querySelector('.form-select')) {
    class Select {
      constructor(wrapper) {
        this.select = document.querySelector(wrapper);
        this.btn = this.select.querySelector('.form-select__btn');
        this.list = this.select.querySelector('.form-select-list');
        this.value = this.select.querySelector('.form-select__value');
        this.isOpen = false;
        this.init();
      }

      init() {
        this.getListHeight();
        this.btn.onclick = (e) => this.toggleList.call(this, e);
        [...this.list.children].forEach(item => {
          const btn = item.querySelector('.form-select-list-item__btn');
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

    new Select('.form-select');
  }
  // <==

  // MAIN
  const title = document.querySelector('.main-title');
  if (title) {
    gsap.to('.main-title-anim__cursor', {
      opacity: 0,
      duration: 0.9,
      ease: "power2.inOut",
      repeat: -1,
    });
    const text = title.querySelector('.main-title__text_hidden');

    gsap.to('.main-title-anim__text', {
      delay: 5,
      duration: 2,
      text: text.textContent,
      ease: "none.none"
    });
  }

  if (document.querySelector('.main-video-anim-container')) {
    const triggerContainer = document.querySelector('.main-video-anim-container');
    const text = document.querySelector('.main__text');
    const video = document.querySelector('.main-video-inner');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });
    tl.from(text, {
      y: '15.7rem'
    }, 'moveY')
      .from(video, {
        width: '88.6rem',
        height: '80.6rem',
        y: '-2.9rem',
        x: '100%',
      }, 'moveY')
  }

  if (document.querySelector('.main-swiper') && document.querySelector('.main-swiper-btns')) {
    const swiper = new Swiper('.main-swiper', {
      effect: 'fade',
      direction: 'horizontal',
      speed: 1000,
      spaceBetween: 100,
      allowTouchMove: false,
    });

    new SwiperController('.main-swiper-btns', swiper);
  }
  // <==

  // ABOUT 
  if (document.querySelector('.about-swiper')) {
    const swiper = new Swiper('.about-swiper', {
      effect: 'fade',
      direction: 'horizontal',
      speed: 1000,
      spaceBetween: 100,
      allowTouchMove: false,
    });

    new SwiperController('.about-swiper-btns', swiper);
  }
  // <==
})