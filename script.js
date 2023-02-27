// Initialization Variables and properties

let move_speed = 3,
  gravity = 0.3;
const potter = document.querySelector(".potter");
const img = document.getElementById("potter-1");
let sound_point = new Audio("sound/point.mp3");
let sound_die = new Audio("sound/die.mp3");

// getting potter  coords
let potter_coords = potter.getBoundingClientRect();

// Getting background coords(left,right,bottom,top,  width and height)
const background = document
  .querySelector(".background")
  .getBoundingClientRect();

const message = document.querySelector(".message");
const score_val = document.querySelector(".score_val");
const score_title = document.querySelector(".score_title");
const best_score_val = document.querySelector(".best-score_val");
const best_score_title = document.querySelector(".best-score_title");
