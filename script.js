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

//storage for best score
let storage = localStorage;

// Easter egg ))
if (+storage.getItem("best score") >= 51) {
  message.style.margin = "3rem";
  message.innerHTML = `
    <span style = "color: green;">Congratulations🍾🎉 </span><br>
    Вітаю ви здали сесію!!!<br> <br>Наступні пів року армія обійдеться без вас

    `;
}

// static conditions
let game_state = "Start";
img.style.display = "none";

//Init start conditions and adding eventlistener to "Space"
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 32 && game_state != "Play") {
    document.querySelectorAll(".pipes").forEach((e) => {
      e.remove();
    });
    img.style.display = "block";
    potter.style.top = "40vh";
    game_state = "Play";
    message.innerHTML = "";
    score_title.innerHTML = "Score: ";
    score_val.innerHTML = "0";
    best_score_title.innerHTML = "Best Score: ";
    best_score_val.innerHTML = storage.getItem("best score");
    message.classList.add("hidden");
    play();
  }
});

//Call this function starts game
function play() {
  function move() {
    
  }

  let potter_dy = 0;
  function apply_gravity() {
    if (game_state != "Play") return;
    potter_dy = potter_dy + gravity;
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        img.src = "images/top.png";
        potter_dy = -7;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.keyCode == 32) {
        img.src = "images/potter 2.png";
      }
    });

    //   Lose when touch web-page borders
    if (potter_coords.top <= 0 || potter_coords.bottom >= background.bottom) {
      game_state = "End";
      message.style.left = "28vw";
      window.location.reload();
      message.classList.add("hidden");
      return;
    }
    potter.style.top = potter_coords.top + potter_dy + "px";
    potter_coords = potter.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;

  let pipe_gap = 35;

  function create_pipe() {
   
  }
}
