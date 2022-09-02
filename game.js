var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

$(document).one("click", function() {
    nextSequence();
})


$(".btn").click(function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColor);
    animatedPress(userChosenColor);
});



function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        wrongPress();
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();

    $("#level-title").text("Level " + level);
    level++;
}

function playSound(name) {
    var audioClick = new Audio("sounds/" + name + ".mp3");
    audioClick.play();
}

function animatedPress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
     }, 1);
}

function wrongPress() {
    playWrong();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
     }, 100);
    $("h1").text("Game Over, Press Any Key to Restart");
}

function playWrong() {
    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    $(document).one("click", function() {
        nextSequence();
    })
}