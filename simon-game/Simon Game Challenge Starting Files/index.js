let gamePattern = [];
let buttonColors = ['red', 'yellow', 'green', 'blue'];
let userPattern = [];
let level = 0;
let started = false;


// Detect first keypress
document.addEventListener("keypress", function () {
  if (!started) {
    document.querySelector("#level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userPattern = []; // reset user pattern at each level

  level++;
  document.querySelector("#level-title").textContent = "Level " + level;

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  play_sound(randomChosenColor);
  animate_press(randomChosenColor);
}

// Handle user clicks
let buttons = document.querySelectorAll(".btn");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (event) {
    let userChosenColor = event.target.id;
    userPattern.push(userChosenColor);

    play_sound(userChosenColor);
    animate_press(userChosenColor);
    checkAnswer(userPattern.length-1)
  });
}

function play_sound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animate_press(currentColour) {
  let crt_color = document.querySelector("#" + currentColour);
  crt_color.classList.add("pressed");
  setTimeout(function () {
    crt_color.classList.remove("pressed");
  }, 200);
}


//function to check if the clicks are right

function checkAnswer(currentLevel){
    if(userPattern[currentLevel]===gamePattern[currentLevel]){
        if (userPattern.length===gamePattern.length) {
            setTimeout(function(){
                nextSequence()
            },1000
                
            )
        }
    }
    else{
        play_sound('wrong')
        let item=document.querySelector('body')
        item.classList.add('game-over')
        setTimeout(function(){
            item.classList.remove('game-over')
            document.querySelector('h1').innerText="Game Over, Press Any Key to Restart"
        },200)

        start_over()
    }
}

function start_over(){
    started=false
    gamePattern=[]
    level=0
}
