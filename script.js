"use strict";

const enterControls = document.querySelectorAll("[data-enter]");
const backControl = document.querySelector("[data-back]");
const story = document.querySelector(".story");
const storyStart = document.querySelector("#exploracao");
let transitionInProgress = false;

function enterStory() {
  if (transitionInProgress) return;
  transitionInProgress = true;
  document.body.classList.add("is-entering", "is-exploring");

  window.setTimeout(() => {
    story.removeAttribute("inert");
    story.classList.add("is-visible");
    storyStart.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 400);

  window.setTimeout(() => {
    document.body.classList.remove("is-entering");
    document.body.classList.remove("is-exploring");
    transitionInProgress = false;
  }, 1050);
}

function returnToHero(event) {
  event.preventDefault();
  story.setAttribute("inert", "");
  story.classList.remove("is-visible");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

enterControls.forEach((control) => {
  control.addEventListener("click", enterStory);
});

backControl.addEventListener("click", returnToHero);

const stage = document.querySelector(".element-stage");
stage.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  const bounds = stage.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  stage.style.setProperty("--pointer-x", `${x.toFixed(2)}deg`);
  stage.style.setProperty("--pointer-y", `${y.toFixed(2)}deg`);
});

stage.addEventListener("pointerleave", () => {
  stage.style.removeProperty("--pointer-x");
  stage.style.removeProperty("--pointer-y");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && story.classList.contains("is-visible")) {
    returnToHero(event);
  }
});
