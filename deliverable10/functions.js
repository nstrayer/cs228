//A collection of accessory files for my javascript leap motion sign language game.

//Decide if the user gets the hints on a given number attempt
function getHint(skill_level) {
    if (Math.random() > skill_level){
        return true; //if they are new show the hints frequently
    } else {
        return false; //make it harder
    }
}

//function to find the users progress through the numbers
function findProgress(user){
    var profile = JSON.parse(localStorage[user])
    var number = 0
    while (profile[number] > 0 & number < 9){
        number++
    }
    return number;
}

function chooseNewNumber(max){ //Choose a new number for the user to sign
    var min = 0;
    if (max < 1){
        max = 1
    } else if (max == 10){
        max = 9
    }

    var newNumber = Math.floor(Math.random() * (max - min + 1)) + min
    while (newNumber == numberToSign){ newNumber = Math.floor(Math.random() * (max - min + 1)) + min}
    return newNumber;
}

function numOfSuccesses(numberData){
    return numberData.filter(function(x){return x==1}).length //find number of 1s or successes in the number data
}

function numOfFailures(numberData){
    return numberData.filter(function(x){return x==0}).length
}

function successRate(numberData){ //takes the users last twenty attempts and finds success rate for number
    if(numberData.length == 0){
        return 0
    } else {
        var lastTwenty = numberData.slice(-20);
        return Math.round(  (numOfSuccesses(lastTwenty)/(numOfSuccesses(lastTwenty) + numOfFailures(lastTwenty)))*100 );
    }
}

//A function to assign a skill level based upon the number of times the user has signed a particular number.
var skillLevelGet = d3.scale.linear()
                      .domain([0,100])
                      .range([0,1])

function backgroundColor(currentFrame, framesToGuess){

    var colorScale = d3.scale.linear()
                        .domain([0,framesToGuess])
                        .range(["steelblue", "red"])

    return colorScale(currentFrame);
}

var howManyFrames = d3.scale.linear()
                      .domain([0,20])
                      .range([1000,300])

function updateBar(newProgress){
    d3.select("#progressBar")
          .transition()
          .duration(1000)
          .attr("width" , barScale(newProgress))

    newText = "Progress"
    if (newProgress == 100){
        newText = "Perfect!"
    } else if (90 < newProgress){
        newText = "Awesome!"
    } else if (80  < newProgress){
        newText = "Getting good!"
    } else if (60  < newProgress){
        newText = "Keep working!"
    } else {
        newText = "You can do it!"
    }

    d3.select("#progressText")
      .text(newText)
}
