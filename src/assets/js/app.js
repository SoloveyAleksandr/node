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

  class ProjectModal {
    constructor() {
      this.wrapper = document.querySelector(".project-modal");
      this.bg = this.wrapper.querySelector(".project-modal-bg");
      this.btn = this.wrapper.querySelector(".project-modal-btn");
      this.title = this.wrapper.querySelector(".project-modal-head__title");
      this.date = this.wrapper.querySelector(".project-modal-head__date");
      this.service = this.wrapper.querySelector(".project-modal-head-service");
      this.description = this.wrapper.querySelector(".project-modal__description");
      this.images = this.wrapper.querySelector(".project-modal-images");
      this.data = {
        title: null,
        date: null,
        service: null,
        description: null,
        images: null,
      };
      this.dataTarget = null;
      this.init();
    }

    init() {
      this.bg.addEventListener("click", this.close.bind(this));
      this.btn.addEventListener("click", this.close.bind(this));
    }

    close() {
      this.wrapper.classList.remove("_active");
      this.data.title = "";
      this.data.date = "";
      this.data.service = "";
      this.data.description = "";
      this.data.images = "";
      this.wrapper.scrollTo(0, 0);
      BODY.classList.remove('_hide');
    }

    open(target) {
      this.dataTarget = target;
      this.getData();
      this.renderData();
      this.wrapper.classList.add("_active");
      BODY.classList.add('_hide');
    }

    getData() {
      if (this.dataTarget) {
        const templateContainer = this.dataTarget.querySelector("template");
        const template = templateContainer ? templateContainer.content : null;
        this.data.title = this.dataTarget.querySelector(".project-card-info__title").innerText;
        this.data.date = this.dataTarget.querySelector(".project-card-info__date").innerText;
        this.data.service = this.dataTarget.querySelectorAll(".project-card-info__name");
        if (template) {
          this.data.description = template.querySelector(".project-modal__description").cloneNode(true).innerHTML;
          this.data.images = template.querySelector(".project-modal-images").innerHTML;
        }
      }
    }

    renderData() {
      this.title.innerText = this.data.title;
      this.date.innerText = this.data.date;
      const serviceFragment = document.createDocumentFragment();
      [...this.data.service].forEach(item => {
        const newItem = document.createElement("li");
        newItem.className = "project-modal-head-service-item";
        newItem.innerText = item.innerText;
        serviceFragment.appendChild(newItem);
      })
      this.service.innerHTML = "";
      this.service.append(serviceFragment);
      this.description.innerHTML = this.data.description;
      this.images.innerHTML = this.data.images;
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
    if (window.matchMedia("(min-width: 1024px)").matches) {
      if (document.querySelector(".header-info")) {
        tl.to('.header-info', {
          height: 0,
          y: '-10rem',
          duration: 0.3,
        }, 'anim')
      }
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

      const menu = new Menu(MENU_BTN, MENU);

      const menuLinks = gsap.utils.toArray(".menu a");
      menuLinks.forEach(link => {
        const href = link.getAttribute("href");
        const index = href.indexOf("#");
        let anchor = null;
        let y = null;

        if (index >= 0) {
          anchor = document.getElementById(href.slice(index + 1).trim());
          if (anchor) {
            y = anchor.getBoundingClientRect().y;
          }
        }

        link.addEventListener("click", () => {
          menu.toggleMenu();

          if (anchor) {
            window.scrollTo(0, y);
          }
        });
      })

      // if (window.matchMedia("(max-width: 1024px)").matches) {
      //   const menuDropdown = document.querySelector(".menu-dropdown");
      //   new MenuDropdownBtn(menuDropdown);
      // }
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
        this.list.style.maxHeight = `${this.listHeight * 2}rem`;
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

  // if (document.querySelector(".form")) {
  //   const form = document.querySelector(".form");
  //   const send = document.querySelector(".form-send");

  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     send.classList.add("_active")
  //   })
  // }
  // <==

  // MAIN
  if (document.querySelector(".main")) {
    const title = document.querySelector('.main-title');
    const titleText = document.querySelector(".main-title-anim__text");

    if (title) {
      gsap.to('.main-title-anim__cursor', {
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
        repeat: -1,
      });

      const mainTl = gsap.timeline({
        duration: 4,
        repeat: -1,
        repeatDelay: 2
      });

      const content = gsap.utils.toArray(".main-title-content__text").map(i => i.innerText);
      content.forEach((item, index) => {
        const tl = gsap.timeline({
          yoyo: true,
          repeat: 1,
          delay: index ? 3 : 1,
          repeatDelay: 1,
        })
        tl.to(".main-title-anim__text", {
          duration: 1,
          text: item,
          ease: "none",
        })
        mainTl.add(tl);
      })
    }

    if (document.querySelector('.main-video-anim-container')) {
      const triggerContainer = document.querySelector('.main-video-anim-container');
      const text = document.querySelector('.main__text');
      const video = document.querySelector('.main-video-inner');

      const textTL = gsap.timeline({
        scrollTrigger: {
          start: "top top",
          end: "bottom 0%",
          endTrigger: ".main-title",
          scrub: 2,
        }
      });
      // const tl_2 = gsap.timeline({
      //   scrollTrigger: {
      //     start: "top top",
      //     end: "0% bottom",
      //     endTrigger: ".main-video",
      //     scrub: 2,
      //     markers: true,
      //   }
      // });

      const videoTL = gsap.timeline({
        scrollTrigger: {
          start: "top top",
          end: "85% bottom",
          endTrigger: ".main-video",
          scrub: 2,
        }
      });

      if (window.matchMedia("(min-width: 1024px)").matches) {
        textTL.from(text, {
          y: '15.7rem',
        })

        videoTL.add(gsap.to(video, { y: 0 }).timeScale(2));
        videoTL.add(gsap.to(video, { width: "100%" }));

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

    // if (document.querySelector(".main-render-list")) {     
    //   if (window.matchMedia("(min-width: 1024px)").matches) {
    //     const items = gsap.utils.toArray(".main-render-list-item-video");

    //     items.forEach(item => {
    //       const video = item.querySelector(".main-render-list-item-video__video");
    //       video.pause();
    //       video.currentTime = 0;

    //       item.addEventListener("mouseenter", () => {
    //         video.play();
    //       })
    //       item.addEventListener("mouseout", () => {
    //         video.pause();
    //         video.currentTime = 0;
    //       })
    //     })
    //   }
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

  // PROJECT-MODAL
  if (document.querySelector(".project-modal")) {
    const projectModal = new ProjectModal();

    const projectsList = gsap.utils.toArray(".project-card");

    projectsList.forEach(item => {
      item.addEventListener("click", (function () {
        projectModal.open(this)
      }));
    })
  }
  //<==

  // ANIMATED BTNS
  const animatedBtns = gsap.utils.toArray(".main-swiper-slide-btn");

  animatedBtns.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      const icon = btn.querySelector(".main-swiper-slide-btn-icon__icon");

      btn.classList.add("_animated");

      icon.addEventListener("animationend", () => {
        btn.classList.remove("_animated");
      })
    })
  })

  const formBtns = gsap.utils.toArray(".form-btn");
  formBtns.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      const icon = btn.querySelector(".form-btn-icon__icon");

      btn.classList.add("_animated");

      icon.addEventListener("animationend", () => {
        btn.classList.remove("_animated");
      })
    })
  })
  //<==

  // VIDEO / IMAGE
  if (window.matchMedia("(max-width: 1023px)").matches) {
    const mediaItems = gsap.utils.toArray("[data-mobile]");
    mediaItems.forEach(video => {
      let videoIsLoaded = false;
      const data = video.getAttribute("data-mobile");

      const source = video.querySelector("source");

      source.removeAttribute("src");
      source.setAttribute("src", data);
      video.load();

      video.addEventListener("canplay", () => {
        if (!videoIsLoaded) {
          video.play();
          videoIsLoaded = true;
        }
      })
    })
  }
  else if (window.matchMedia("(min-width: 1024px)").matches) {
    const mediaItems = gsap.utils.toArray("[data-desktop]");

    mediaItems.forEach(video => {
      let videoIsLoaded = false;
      const data = video.getAttribute("data-desktop");

      const source = video.querySelector("source");

      source.removeAttribute("src");
      source.setAttribute("src", data);
      video.load();

      video.addEventListener("canplay", () => {
        if (!videoIsLoaded) {
          video.classList.add("_canplay");
          video.play();
          videoIsLoaded = true;
        }
      })
    })
  }
  if (document.querySelector(".main-render-list")) {
    class RenderVideo {
      constructor(item) {
        this.wrapper = item;
        this.poster = this.wrapper.querySelector(".main-render-list-item-video__poster");
        this.videoContainer = this.wrapper.querySelector(".main-render-list-item-video");
        this.video = this.wrapper.querySelector(".main-render-list-item-video__video");
        if (this.wrapper && this.poster && this.video) {
          this.init();
        }
      }

      init() {
        this.poster.classList.remove("_hide");
        this.videoContainer.addEventListener("mouseenter", () => {
          if (this.video.classList.contains("_canplay")) {
            this.poster.classList.add("_hide");
            this.video.currentTime = 0;
            this.video.play();
          }
        })
        this.videoContainer.addEventListener("mouseleave", () => {
          if (this.video.classList.contains("_canplay")) {
            this.poster.classList.remove("_hide");
            this.video.currentTime = 0;
            this.video.pause();
          }
        })
        this.videoContainer.addEventListener("touchstart", () => {
          if (this.video.classList.contains("_canplay")) {
            this.poster.classList.add("_hide");
            this.video.currentTime = 0;
            this.video.play();
          }
        })
        this.videoContainer.addEventListener("touchend", () => {
          if (this.video.classList.contains("_canplay")) {
            this.poster.classList.remove("_hide");
            this.video.currentTime = 0;
            this.video.pause();
          }
        })
      }
    }

    const renderItems = gsap.utils.toArray(".main-render-list-item");
    renderItems.forEach(item => {
      new RenderVideo(item);
    });
  }
  //<==
  const startWindowWidth = window.innerWidth;
  window.addEventListener("resize", (e) => {
    if (e.currentTarget.innerWidth < startWindowWidth * 0.9 || e.currentTarget.innerWidth > startWindowWidth * 1.1) {
      location.reload();
    }
  });

  const articleMain = document.querySelector(".article-main");

  if (articleMain && window.matchMedia("(min-width: 1024px)").matches) {
    const title = articleMain.querySelector(".article-main__title");
    const texts = articleMain.querySelectorAll(".article-main__text");
    const images = articleMain.querySelectorAll(".article-main-img");

    const docFragment = document.createDocumentFragment();
    const box_1 = document.createElement("div");
    box_1.className = "article-main__box";
    const box_2 = document.createElement("div");
    box_2.className = "article-main__box";
    box_1.appendChild(title);
    texts.forEach(item => box_1.appendChild(item));
    images.forEach(item => box_2.appendChild(item));
    docFragment.appendChild(box_1);
    docFragment.appendChild(box_2);

    articleMain.append(docFragment);
  }
});