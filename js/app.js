/* Global Variables */
const sections = document.getElementsByTagName("section");
const navList = document.getElementById("navbar__list");
const getScrollToTopBtn = document.getElementById("scroll-to-top-btn");

/* Functions */

// Adds menu navbar__menu class to nav
const addMenuClass = (navList) => {
  return navList.classList.add("navbar__menu");
};

// Dynamic Nav
const buildNav = (sections, navList) => {
  for (const section of sections) {
    const linkList = document.createElement("li");
    const linkItem = document.createElement("a");
    const sectionData = section.getAttribute("data-nav");
    const sectionId = section.getAttribute("id");

    linkItem.setAttribute("href", `#${sectionId}`);
    linkItem.classList.add("menu__link");
    linkItem.classList.add(`${sectionId}`);
    linkItem.textContent = `${sectionData}`;

    linkItem.addEventListener("click", e => {
      e.preventDefault();
      document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      })
    })
    navList.appendChild(linkList).appendChild(linkItem);
  }
};

// Hides the nav with the person is scrolling down
const hideNavWhenScrolling = (navList) => {
  let previousScrollPosition = window.pageYOffset;
  let isScrolling;

  window.addEventListener(
    "scroll", () => {
      let currentScrollPostion = Math.floor(window.pageYOffset);

      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        navList.classList.add("navbar__menu");
        navList.classList.remove("navbar__menu-hidden");
      }, 550);

      if (
        previousScrollPosition < currentScrollPostion &&
        currentScrollPostion > 500
      ) {
        navList.classList.remove("navbar__menu");
        navList.classList.add("navbar__menu-hidden");
      } else {
        navList.classList.add("navbar__menu");
        navList.classList.remove("navbar__menu-hidden");
      }
      previousScrollPosition = currentScrollPostion;
    },
    false
  );
};

// Shows the to top button after the person has scrolled past 300 Y offset 
const showToTopButton = (getScrollToTopBtn) => {
  let previousScrollPosition = window.pageYOffset;

  window.addEventListener("scroll", () => {
      let currentScrollPostion = Math.ceil(window.pageYOffset);

      if (
        previousScrollPosition + 300 < currentScrollPostion ||
        currentScrollPostion >= 300
      ) {
        getScrollToTopBtn.classList.remove("landing__button--hide");
        getScrollToTopBtn.classList.add("landing__button--to-top");
      } else {
        getScrollToTopBtn.classList.remove("landing__button--to-top");
        getScrollToTopBtn.classList.add("landing__button--hide");
      }
      previousScrollPosition = currentScrollPostion;
    },
    false
  );
};

// Sets current section to active on scroll and highlight current nav section
const highlightNavLinkOnScroll = () => {
  window.addEventListener("scroll", () => {
    let currentSection = "";

    for (let section of sections) {
      const sectionId = section.getAttribute("id");
      currentSection = document.querySelector(`.${sectionId}`);
      const sectionTop = section.offsetTop;
      if (pageYOffset + 350 > sectionTop && pageYOffset - 350 < sectionTop) {
        currentSection.classList.add("active");
        section.classList.add("your-active-class");
      } else {
        currentSection.classList.remove("active");
        section.classList.remove("your-active-class");
      }
    }
  });
};

//Scrolls to top 
const toTopOnClick = (btn) => {
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  });
};

// Adds class to nav so styles stays consistent
addMenuClass(navList);

// Build menu
buildNav(sections, navList);

// Hilight nav onscroll
highlightNavLinkOnScroll();

// Sides nav when scrolling down
hideNavWhenScrolling(navList);

// Shows the to top button after the person has scrolled past 300 Y offset 
showToTopButton(getScrollToTopBtn);

// Scrolls to top on click
toTopOnClick(getScrollToTopBtn);
