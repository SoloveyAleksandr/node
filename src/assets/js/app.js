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
    constructor(btns, swiper) {
      this.btnsList = btns;
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
      this.setActive(this.btnsList[0]);
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

  class MenuDropdownBtn {
    constructor(container) {
      this.wrapper = container;
      this.btn = this.wrapper.querySelector(".dropdown-btn");
      this.container = this.wrapper.querySelector(".dropdown-container");
      this.isOpen = this.wrapper.getAttribute("data-open") !== null;
      this.init();
    }

    init() {
      this.maxHeight = this.container.scrollHeight * 2 / 10 + "rem";
      this.btn.addEventListener("click", this.handleClick.bind(this));
      if (this.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }

    handleClick() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
      this.isOpen = !this.isOpen;
    }

    open() {
      this.wrapper.classList.add("_active");
      this.container.style.maxHeight = this.maxHeight;
    }

    close() {
      this.wrapper.classList.remove("_active");
      this.container.style.maxHeight = 0;
    }
  }

  class DropdownBtn {
    constructor(container) {
      this.wrapper = container;
      this.btn = this.wrapper.querySelector(".dropdown-btn");
      this.container = this.wrapper.querySelector(".dropdown-container");
      this.isOpen = this.wrapper.getAttribute("data-open") !== null;
      this.init();
    }

    init() {
      this.maxHeight = this.container.scrollHeight * 2 / 10 + "rem";
      if (this.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }

    open() {
      this.wrapper.classList.add("_active");
      this.btn.classList.add("_active");
      this.container.style.maxHeight = this.maxHeight;
      this.isOpen = true;
    }

    close() {
      this.wrapper.classList.remove("_active");
      this.btn.classList.remove("_active");
      this.container.style.maxHeight = 0;
      this.isOpen = false;
    }
  }

  class DropdownController {
    constructor(items) {
      this.controlledItem = items;
      this.init();
    }

    init() {
      this.controlledItem.forEach((item, index) => {
        item.btn.addEventListener("click", this.handleClick.bind(this, index));
      })
    }

    handleClick(targetIndex) {
      this.controlledItem.forEach((item, index) => {
        if (index !== targetIndex) {
          item.close();
        } else {
          item.isOpen ? item.close() : item.open();
        }
      })
    }
  }

  // SMOOTH SCROLL
  SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: 800,
    // Размер шага в пикселях 
    stepSize: 60,

    // Дополнительные настройки:

    // Ускорение 
    accelerationDelta: 30,
    // Максимальное ускорение
    accelerationMax: 2,

    // Поддержка клавиатуры
    keyboardSupport: true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,

    // Поддержка тачпада
    touchpadSupport: true,
  })
  //<==

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
    if (window.matchMedia("(min-width: 1025px)").matches) {
      tl.to('.header-info', {
        height: 0,
        y: '-10rem',
        duration: 0.3,
      }, 'anim')
      tl.to('.header-logo', {
        margin: 0,
        height: '4rem',
        duration: 0.3,
      }, 'anim')
      tl.to('.header', {
        boxShadow: '0 0.1rem 1rem rgba(0, 0, 0, 0.15)',
        duration: 0.3,
      }, 'anim')
    }

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

      if (window.matchMedia("(max-width: 1025px)").matches) {
        const menuDropdown = document.querySelector(".menu-dropdown");
        new MenuDropdownBtn(menuDropdown);
      }
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
  if (document.querySelector(".main")) {
    const title = document.querySelector('.main-title');
    // const mainVideoContainer = document.querySelector(".main-video-inner");
    // const mainVideo = document.querySelector(".main-video__video");
    // const mainVideoPreview = document.querySelector(".main-video__preview");
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

      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: triggerContainer,
      //     start: "top top",
      //     end: "bottom bottom",
      //     scrub: 2,
      //   }
      // });

      let tl;

      if (window.matchMedia("(min-width: 1025px)").matches) {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerContainer,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
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
      } else if (window.matchMedia("(min-width: 851px)").matches) {
      }
    }

    if (document.querySelector('.main-swiper') && document.querySelector('.main-swiper-btns')) {
      const swiperDropDownContainers = gsap.utils.toArray(".main-swiper-dropdown");

      if (window.matchMedia("(min-width: 651px)").matches) {
        const swiperWrapper = document.querySelector(".main-swiper-wrapper");

        (() => {
          const docFragment = document.createDocumentFragment();
          swiperDropDownContainers.forEach(container => {
            const slide = document.createElement("div")
            slide.className = "swiper-slide main-swiper-slide";
            const slideContent = container.querySelector(".dropdown-container").childNodes;
            slide.append(...slideContent);
            docFragment.appendChild(slide);
          })
          swiperWrapper.appendChild(docFragment)
        })()

        const swiper = new Swiper('.main-swiper', {
          effect: 'fade',
          direction: 'horizontal',
          speed: 1000,
          spaceBetween: 100,
          allowTouchMove: false,
        });

        const swiperBtns = gsap.utils.toArray(".main-swiper-btns-btn");

        new SwiperController(swiperBtns, swiper);
      } else if (window.matchMedia("(max-width: 650px)").matches) {


        const dropdownBtns = [];

        swiperDropDownContainers.forEach(item => {
          dropdownBtns.push(new DropdownBtn(item));
        })

        new DropdownController(dropdownBtns);
      }
    }

    // if (mainVideoContainer) {
    // mainVideoContainer.addEventListener("mouseenter", () => {
    // mainVideoPreview.classList.add("_active");
    // mainVideo.play();
    // });

    // mainVideoContainer.addEventListener("mouseleave", () => {
    // mainVideoPreview.classList.remove("_active");
    // mainVideo.pause();
    // });
    // }
  }
  // <==

  // ABOUT 
  if (document.querySelector('.about-swiper')) {
    const dropdownContainers = gsap.utils.toArray(".about-swiper-dropdown");

    if (window.matchMedia("(min-width: 1331px)").matches) {

      (() => {
        const swiperWrapper = document.querySelector(".about-swiper-wrapper");
        const docFragment = document.createDocumentFragment();

        dropdownContainers.forEach(item => {
          const slide = document.createElement("div");
          slide.className = "about-swiper-slide swiper-slide";
          const slideContent = item.querySelector(".dropdown-container").childNodes;
          slide.append(...slideContent);
          docFragment.appendChild(slide);
        })
        swiperWrapper.appendChild(docFragment);
      })()

      const swiper = new Swiper('.about-swiper', {
        effect: 'fade',
        direction: 'horizontal',
        speed: 1000,
        spaceBetween: 100,
        allowTouchMove: false,
      });

      const swiperBtns = gsap.utils.toArray(".about-swiper-btns-btn");
      new SwiperController(swiperBtns, swiper);
    } else if (window.matchMedia("(max-width: 1330px)").matches) {

      const dropdownBtns = [];
      dropdownContainers.forEach(item => {
        dropdownBtns.push(new DropdownBtn(item));
      })

      new DropdownController(dropdownBtns);
    }
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
      spaceBetween: 15,

      breakpoints: {
        1025: {
          spaceBetween: 40,
        }
      }
    });
  }
  // <==

  // BLOG
  if (document.querySelector(".blog-filter-dropdown")) {
    const filterDropdown = document.querySelector(".blog-filter-dropdown");

    if (window.matchMedia("(max-width: 1330px)").matches) {
      new MenuDropdownBtn(filterDropdown);
    }
  }
  //<==
})