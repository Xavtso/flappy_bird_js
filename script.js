// Initialization Variables and properties

let move_speed = 5,
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
    move_speed = 5;
    best_score_title.innerHTML = "Best Score: ";
    best_score_val.innerHTML = storage.getItem("best score");
    message.classList.add("hidden");
    play();
  }
});

//Call this function starts game
function play() {
  function move() {
    if (game_state != "Play") return;
    // selecting pipes created before
    let pipes = document.querySelectorAll(".pipes");
    pipes.forEach((element) => {
      // getting pipes coords
      let pipe_coords = element.getBoundingClientRect();
      potter_coords = potter.getBoundingClientRect();

      //   Removing pipes when they touch left border
      if (pipe_coords.left <= 0) {
        element.remove();
        ////////
      } else {
        if (
          potter_coords.left < pipe_coords.left + pipe_coords.width &&
          potter_coords.left + potter_coords.width > pipe_coords.left &&
          potter_coords.top < pipe_coords.top + pipe_coords.height &&
          potter_coords.top + potter_coords.height > pipe_coords.top
        ) {
          game_state = "End";

          message.innerHTML = `
            <span style = "color: red;"> Перездача</span> <br><br> Відправляйтесь на Талон 
            `;
          message.classList.remove("hidden");
          img.style.display = "none";
          sound_die.play();

          if (+score_val.innerHTML > +best_score_val.innerHTML) {
            storage.setItem("best score", score_val.innerHTML);
          }
          return;
        } else {
          if (
            pipe_coords.right < potter_coords.left &&
            pipe_coords.right + move_speed >= potter_coords.left &&
            element.increase_score == "1"
          ) {
            score_val.innerHTML = +score_val.innerHTML + 1;
            move_speed += 0.1;
            console.log(move_speed);
            sound_point.play();
          }
          element.style.left = pipe_coords.left - move_speed + "px";
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let potter_dy = 0;
  function apply_gravity() {
    if (game_state != "Play") return;
    potter_dy = potter_dy + gravity;
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
//         img.src = "images/top.png"; // Commented to get more perfomance
        potter_dy = -7;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.keyCode == 32) {
//         img.src = "images/potter 2.png";
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
    if (game_state != "Play") return;

    if (pipe_seperation > 115) {
      pipe_seperation = 0;

      // Creating ceil pipes
      let pipe_position = Math.floor(Math.random() * 43) + 8;
      let pipe_ceil = document.createElement("div");
      pipe_ceil.className = "pipes";
      pipe_ceil.classList.add("pipe_ceil");
      pipe_ceil.style.top = pipe_position - 70 + "vh";
      pipe_ceil.style.left = "100vw";

      document.body.appendChild(pipe_ceil);

      // Creating floor pipes
      let pipe_floor = document.createElement("div");
      pipe_floor.className = "pipes";
      pipe_floor.classList.add("pipe_floor");

      pipe_floor.style.top = pipe_position + pipe_gap + "vh";
      pipe_floor.style.left = "100vw";
      pipe_floor.increase_score = "1";

      document.body.appendChild(pipe_floor);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
