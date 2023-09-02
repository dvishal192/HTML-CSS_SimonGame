
//Variable declarations
let randomNumber;
let randomChosenColour;

const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

let heading = document.querySelector('h1');
let userChosenColour;
let colourName;




//Defining a new Audio object
//PlaySound
const playSound = function (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//PauseSound
const pauseSound = function () {
    audio.pause();
}





//Starting the simon game. Event Listener on document. 
$(document).keypress(function () {
    if (started == false) {
        nextSequence();
        started = true;
    }
});


// Function-- Next Sequence
const nextSequence = function () {

    userClickedPattern = [];
    
    
    //Icrementing level and changing the title
    level = level + 1;
    heading.innerHTML = `Level ${level}`;


    randomNumber = Math.floor(Math.random() * 4);

    //Taking the random Colour Button
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    console.log(userClickedPattern);
    console.log(gamePattern);

    //Animating the random chosen button
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


    //Audio
    playSound(randomChosenColour);

}



//Function-- CheckAnswer
const checkAnswer = function (currentLevel) {
     
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        heading.innerHTML = 'Game Over, Press Any Key to Restart';
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 400);

        startOver();
    }
}




//Function-- Event Listener on Button Press.
$(".btn").click(function (e) {
    //Retrieving the user chosen colour
    userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);


    //Calling check Answer
    checkAnswer(userClickedPattern.length - 1);


    //Calling function playSound()
    playSound(userChosenColour);

    //Calling function Animate Press;
    animatePress(userChosenColour);
})


//Function-- Animate Press
const animatePress = function (currentColour) {
    $("#" + currentColour).addClass("pressed");
    //Creating a delay function
    setTimeout(function () {
        $("#" + userChosenColour).removeClass('pressed');
    }, 100);
}


//Function-- Start Over
const startOver = function () {
    level = 0;
    gamePattern = [];
    started = false;
}

