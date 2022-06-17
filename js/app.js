let colorId = localStorage.getItem("color-id");
const li = document.querySelector(`#${colorId}`);

if (colorId !== null) {
  // set main color to choosen color
  document.documentElement.style.setProperty("--main-color", li.dataset.color);

  // Active

  // remove active from all elements
  document.querySelectorAll(".colors-list li.active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active to the activated element
  li.classList.add("active");
}

const landingPage = document.querySelector(".landing-page");
const imgsNum = 10;
const settingsBox = document.querySelector(".settings-box");
const settingsBtn = document.querySelector(".settings-box button");

// ------------------------------------  Random Backgrounds  ------------------------------------------

let bgImgBolean = true;

let bgInterval;

let changeBg = () => {
  if (bgImgBolean === true) {
    bgInterval = setInterval(() => {
      document.querySelector(
        ".landing-page"
      ).style.background = `url('imgs/img${
        Math.floor(Math.random() * imgsNum) + 1
      }.jpg') #000`;
    }, 1000);
  }
};

changeBg();

let randomBg = localStorage.getItem("random-background");

if (randomBg !== null) {
  // set option to yes or no
  if (randomBg === "false") {
    bgImgBolean = false;
    clearInterval(bgInterval);
  } else {
    bgImgBolean = true;
    changeBg();
  }

  // Active

  // remove active from all spans
  document
    .querySelectorAll(".random-backgrounds span.active")
    .forEach((element) => {
      element.classList.remove("active");
    });

  // add active to selected span
  if (randomBg === "false") {
    document
      .querySelector(".random-backgrounds span.no")
      .classList.add("active");
  } else {
    document
      .querySelector(".random-backgrounds span.yes")
      .classList.add("active");
  }
}

// ################################################## SETTINGS ##################################################

settingsBtn.addEventListener("click", () => {
  settingsBox.classList.toggle("open");
});

// ------------------------------------  COLORS OPTION  ------------------------------------------

document.querySelectorAll(".colors-list li").forEach((li) => {
  // li color
  let color = li.dataset.color;

  // set li background color
  li.style.background = color;

  li.addEventListener("click", (e) => {
    // set main color to choosen color
    document.documentElement.style.setProperty("--main-color", color);

    localStorage.setItem("color-id", e.target.id);

    handleActive(e);
  });
});

// ------------------------------------  RANDOM BG OPTION  ------------------------------------------

document.querySelectorAll(".random-backgrounds span").forEach((span) => {
  span.addEventListener("click", (e) => {
    // set option to yes or no
    if (e.target.dataset.bolean === "no") {
      bgImgBolean = false;
      clearInterval(bgInterval);

      localStorage.setItem("random-background", false);
    } else {
      bgImgBolean = true;
      changeBg();

      localStorage.setItem("random-background", true);
    }
    handleActive(e);
  });
});

// ------------------------------------  SHOW NAV BULLETS OPTION  ------------------------------------------

const navBulletsOption = localStorage.getItem("nav-bullets-option");

if (navBulletsOption !== null) {
  document.querySelector(".nav-bullets").style.display = navBulletsOption;

  document
    .querySelectorAll(".option-box .show-nav-option span.active")
    .forEach((span) => {
      span.classList.remove("active");
    });

  if (navBulletsOption === "block") {
    document
      .querySelector(".option-box .show-nav-option span.yes")
      .classList.add("active");
  } else {
    document
      .querySelector(".option-box .show-nav-option span.no")
      .classList.add("active");
  }
}

document
  .querySelectorAll(".option-box .show-nav-option span")
  .forEach((span) => {
    span.addEventListener("click", (e) => {
      document.querySelector(".nav-bullets").style.display =
        e.target.dataset.display;

      localStorage.setItem("nav-bullets-option", e.target.dataset.display);

      handleActive(e);
    });
  });

// ------------------------------------  RESET OPTIONS  ------------------------------------------

document.querySelector(".reset-options").addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

// ########################################## NAV BULLETS & NAV BAR #############################################

let scrollToSomewhere = (elements) => {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.scroll).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};

scrollToSomewhere(document.querySelectorAll(".nav-bullets .bullet"));
scrollToSomewhere(document.querySelectorAll(".header .links li"));

// ################################################## SKILLS ##################################################

const skillProgress = document.querySelectorAll(
  ".skills .skill-box .skill-progress span"
);
const ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  if (this.pageYOffset >= ourSkills.offsetTop - ourSkills.offsetTop / 3) {
    console.log("readed");
    skillProgress.forEach((element) => {
      element.style.width = element.dataset.percent;
    });
  }
};

// ################################################## POPUP ##################################################

document.querySelectorAll(".gallery .imgs-box img").forEach((img) => {
  img.addEventListener("click", (e) => {
    const popOverlay = document.createElement("div");
    popOverlay.classList.add("popup-overlay");

    document.body.appendChild(popOverlay);

    const popBox = document.createElement("div");
    popBox.classList.add("popup-box");

    // Create Title
    const popH2 = document.createElement("h2");

    const popH2Text = document.createTextNode(img.alt);

    popH2.appendChild(popH2Text);

    popBox.appendChild(popH2);

    // Create Img
    const popImg = document.createElement("img");
    popImg.classList.add("popup-img");
    popImg.src = img.src;

    popBox.appendChild(popImg);

    // Create X
    const popX = document.createElement("span");
    popX.classList.add("popup-x");

    const popXText = document.createTextNode("X");

    popX.appendChild(popXText);

    popBox.appendChild(popX);

    document.body.appendChild(popBox);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup-x")) {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// ############################################# FUNCTIONS ##################################################

let handleActive = (e) => {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
};

// ^^^^^^^!!!!@@@@@@@@##########$$$$$%%%  R E S P O N S I V E  ^^^^^&&&&&&&&&&&&&&&&**************(((((((((((()))))))))))))_+)))))))

const navLinks = document.querySelector(".header .links");
const menuBtn = document.querySelector(".menu-button");

document.addEventListener("click", (e) => {
  // Toggle open using menu button
  if (e.target.classList.contains("menu-button")) {
    e.target.classList.toggle("open");
    navLinks.classList.toggle("open");
  }
  // Remove open if user clicked anywhere on screen
  else {
    // If nav list is opened
    if (navLinks.classList.contains("open")) {
      if (
        e.target !== navLinks && // If user click else (nav list)
        e.target !== menuBtn && // If user click else (menu button)
        e.path[1] !== document.querySelector(".links") // If user click else the links inside the nav bar
      ) {
        document.querySelector(".menu-button.open").classList.remove("open");
        navLinks.classList.remove("open");
      }
    }
  }
});
