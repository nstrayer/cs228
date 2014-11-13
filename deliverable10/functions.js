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

function successRate(numberData,time){ //takes the users last twenty attempts and finds success rate for number
    var data;
    if( numberData.length == 0){
        return 0
    } else {
        if (time == "current"){

            data = numberData.slice(-20);

        } else if (time = "overAll"){

            data = []
            for (var i = 0; i < 10; i++){
                data = data.concat(userData[i].slice(-20))
            }

        } else {
            data = numberData;
        }

        return Math.round(  (numOfSuccesses(data)/(numOfSuccesses(data) + numOfFailures(data)))*100 );
    }
}

//A function to assign a skill level based upon the number of times the user has signed a particular number.
var skillLevelGet = d3.scale.linear()
                      .domain([0,100])
                      .range([0,1])

function backgroundColor(currentFrame, framesToGuess){

    var colorScale = d3.scale.linear()
                        .domain([0,framesToGuess])
                        .range(["#1f78b4", "#e31a1c"])

    return colorScale(currentFrame);
}

var howManyFrames = d3.scale.linear()
                      .domain([0,20])
                      .range([500,200])


function everyoneAvg(){
    var userData,
        bigArray = []
        successes = 0
        fails = 0;

    for (var key in localStorage){

        userData = JSON.parse(localStorage[key]) //grab each persons data
        // console.log(key)
        // console.log(userData)

        for (var i = 0; i < 10; i++){ //loop through their numbers
            bigArray = bigArray.concat(userData[i])
        }
    }

    successes = numOfSuccesses(bigArray)
    fails     = numOfFailures(bigArray)

    return (successes/ (successes + fails))
}
