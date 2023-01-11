document.addEventListener("DOMContentLoaded", () => {
  const BODY = document.querySelector('body');
  const LOADER = document.querySelector('.loader');
  const HEADER = document.querySelector('.header');
  const MENU = document.querySelector('.menu');
  const MENU_BTN = document.querySelector('.header-btn');

  class MainInfo {
    constructor() {
      this.scrollWidth = window.innerWidth - document.body.clientWidth + 'px';
    }
  }

  const MAIN_INFO = new MainInfo();

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
  if (LOADER) {
    BODY.classList.add('_hide');
    const tl = gsap.timeline({
      onComplete: () => {
        LOADER.classList.remove('_active');
        BODY.classList.remove('_hide');
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

  // HEADER + MENU
  if (HEADER) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: BODY,
        start: "top +=100rem",
        end: "+=100rem top",
        toggleActions: "reverse play reverse play",
      }
    })
      .to('.header-info', {
        height: 0,
        y: '-10rem',
        duration: 0.3,
      }, 'anim')
      .to('.header-logo', {
        margin: 0,
        height: '4rem',
        duration: 0.3,
      }, 'anim')
      .to('.header', {
        boxShadow: '0 0.1rem 1rem rgba(0, 0, 0, 0.15)',
        duration: 0.3,
      }, 'anim')

    // MENU
    if (MENU) {
      class Menu {
        constructor(btn, menu) {
          this.btn = btn;
          this.menu = menu;
          this.init();
        }

        init() {
          this.setMax();
          this.btn.onclick = this.toggleMenu.bind(this);
        }

        setMax() {
          BODY.style.setProperty('--scroll', MAIN_INFO.scrollWidth);
          HEADER.style.setProperty('--scroll', MAIN_INFO.scrollWidth);
          MENU.style.setProperty('--scroll', MAIN_INFO.scrollWidth);
        }

        toggleMenu() {
          this.btn.classList.toggle('_active');
          this.menu.classList.toggle('_active');
          BODY.classList.toggle('_hide');
          if (this.btn.classList.contains('_active')) {
            tl.reverse();
          } else {
            if (tl.scrollTrigger.progress === 1) tl.play();
            return;
          }
        }
      }

      new Menu(MENU_BTN, MENU);
    }
    // <==
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

  // VISUALIZATION
  if (document.querySelector('.visualization-swiper-container')) {
    const swiper = new Swiper('.visualization-swiper', {
      speed: 400,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.visualization-swiper-btn_next',
        prevEl: '.visualization-swiper-btn_prev',
      },
    });
  }
  // <==
})