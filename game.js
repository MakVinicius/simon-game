let userClickedPattern = [];
let gamePattern = [];
let colours = ["green", "red", "yellow", "blue"];
let started = '';
let level = 0;

$(document).keydown(function(event) {
    if (event.which === 65 && started === '') {
        started = event.which;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    let userChosenColourID = "#" + userChosenColour;
    userClickedPattern.push(userChosenColour);
    flashButton(userChosenColourID);
    animatePress(userChosenColourID);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let randomChosenNumber = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    let randomChosenColour = colours[randomChosenNumber];
    let strColour = "#" + randomChosenColour;
    gamePattern.push(randomChosenColour);
    
    flashButton(strColour);
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $(currentColour).addClass("pressed");
    setTimeout(function() {
        $(currentColour).removeClass("pressed");
    }, 100);
    
}

function flashButton(colour) {
    $(colour).fadeOut(100).fadeIn(100);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = '';
}