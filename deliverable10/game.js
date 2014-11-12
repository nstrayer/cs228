var riggedHandPlugin;

var handPresent  = false,
    framesAfter  = 999,  //number of frames after succesfull sign, for success and fail screen triggers
    framesElapsed= 0,    //frames since being given new number to sign, for background color change
    numberToSign = 1,    //always start with one, no reason in particular
    showHint     = true, //always show hints at first
    celebrating  = false,
    fail         = false,
    upTo         = findProgress(userValue), //The last digit that is allowed to be used.
    pastSuccess  = userData["lastSuccessRate"],
    framesToGuess= 1000,
    currentlySigning;

console.log("Past success rate of " + pastSuccess)

Leap.loop({

  hand: function(hand){

    var handMesh = hand.data('riggedHand.mesh');

    var fingers = hand.fingers,       //grab info on fingers for detecting numbers
        thumb   = fingers[0].extended,
        index   = fingers[1].extended,
        middle  = fingers[2].extended,
        ring    = fingers[3].extended,
        pinky   = fingers[4].extended;

    framesAfter++ //increment the frames after counter up 1
    if (framesAfter == 100){ //reset frames elapsed success or failure screens
        framesElapsed = 0
    } else {
        framesElapsed++ //increase framesElapsed
    }

    //there are a total of 3 possible states for the program to be in:
    //User __failed__ to sign the number correctly, orange screen
    //User __succesfull__ signed the number given, green screen
    //__Normal__ opperation, user is currently trying to sign number
    if (framesAfter < 100 & fail){ // fail screen
        d3.select("body").style("background-color", "orange")
        d3.select("#reward").text("Let's try a different number.")

    } else if (framesAfter < 100 & !fail){ // Success screen
        d3.select("body").style("background-color", "green")
        d3.select("#reward").text("Good Job!")

    } else { //normal screen
        d3.select("body").style("background-color", backgroundColor(framesElapsed, framesToGuess)) //revert color of background
        d3.select("#reward").text("") //Get rid of good job message, it's serious again
        d3.select("#prompt").text("Try signing a " + numberToSign) //Update with new number to sign.
        d3.select("#numberCount").text("Your success rate for " + numberToSign + " is " + successRate(userData[numberToSign]) + "%") //Update with the number of times signed
        celebrating = false //turn off celebrating boolean for finger hints
        fail        = false //turn off fail
        localStorage[userValue] = JSON.stringify(userData) //update the user's data
    }

    //Where all the magic happens!
    if (thumb && !index && !middle && !ring && !pinky) {
        currentlySigning = 0
    } else if(!thumb  && index  && !middle && !ring && !pinky){
        currentlySigning = 1
    } else if(!thumb  && index  && middle  && !ring && !pinky){
        currentlySigning = 2
    } else if (thumb  && index  && middle  && !ring && !pinky){
        currentlySigning = 3
    } else if (!thumb && index  && middle  && ring  && pinky ){
        currentlySigning = 4
    } else if (thumb  && index  && middle  && ring  && pinky ){
        currentlySigning = 5
    } else if (!thumb && index  && middle  && ring  && !pinky){
        currentlySigning = 6
    } else if (!thumb && index  && middle  && !ring && pinky ){
        currentlySigning = 7
    } else if (!thumb && index  && !middle && ring  && pinky ){
        currentlySigning = 8
    } else if (!thumb && !index && middle  && ring  && pinky ){
        currentlySigning = 9
    } else {
        currentlySigning = "_"
    }

    if (framesElapsed == framesToGuess){ //user ran out of time without signing number
        fail          = true //they did indeed fail
        userData[numberToSign]["failures"]++
        numberToSign  = chooseNewNumber(upTo); //choose new number
        showHint      = getHint(skillLevelGet(userData[numberToSign]["successes"])) //Decide to show hint for next # or not.
        framesToGuess = howManyFrames(userData[numberToSign]["successes"]) //Get how long the user has for the attempt
        if (framesToGuess < 300){framesToGuess = 300} //put a floor on it.
        framesAfter   = 1    // Start frames after counter
        console.log("User is going to sign " + numberToSign + " and has " + framesToGuess + " frames to do it.")
    }
    //If the user has successfully signed the number assigned to them:
    if (currentlySigning == numberToSign){
        celebrating  = true          // Turn on celebrating to turn off finger hints, less confusing
        userData[currentlySigning]["successes"]++ //increment the count for the signed number
        if (userData[upTo]["successes"] > 5){upTo++} //if they have signed the current number 5 or more times, add a new #
        numberToSign  = chooseNewNumber(upTo); //re-choose a new number to sign, keeping in mind how far along the user is
        framesToGuess = howManyFrames(userData[numberToSign]["successes"]) //Get how long the user has for the attempt
        showHint      = getHint(skillLevelGet(userData[numberToSign]["successes"])) //Decide to show hint for next # or not.
        if (framesToGuess < 300){framesToGuess = 300} //put a floor on it.
        framesAfter   = 1 // Start frames after counter for success visualization
        console.log("User is going to sign " + numberToSign + " and has " + framesToGuess + " frames to do it.")
    }

    d3.select("#feedback").text(currentlySigning) //Update the gui to show the number they are currently signing

    var screenPosition = handMesh.screenPosition(
      hand.palmPosition,
      riggedHandPlugin.camera
    )

  }

})
.use('riggedHand', {
  scale: 1.3,
  boneColors: function (boneMesh, leapHand){

    //Let's decide if the user gets to see help on the fingers to use for a sign.
    if (showHint & !celebrating){ //if we are celebrating dont show help, it's distracting

      if ((boneMesh.name.indexOf('Finger_') == 0) ) {
          if(numberToSign == 1 ) {
              if (boneMesh.name.indexOf('Finger_1') == 0) {
                  return {
                      hue: 0.34,
                      saturation: .8,
                      lightness: 0.5
                  }
              }
          } else if (numberToSign == 2){
              if (boneMesh.name.indexOf('Finger_1') == 0 ||
                  boneMesh.name.indexOf('Finger_2') == 0) {
                  return {
                      hue: 0.34,
                      saturation: .8,
                      lightness: 0.5
                  }
              }
          } else if (numberToSign == 3){
              if (boneMesh.name.indexOf('Finger_0') == 0 ||
                  boneMesh.name.indexOf('Finger_1') == 0 ||
                  boneMesh.name.indexOf('Finger_2') == 0) {
                  return {
                      hue: 0.34,
                      saturation: .8,
                      lightness: 0.5
                  }
              }
          } else if (numberToSign == 4){
              if (boneMesh.name.indexOf('Finger_1') == 0 ||
                  boneMesh.name.indexOf('Finger_2') == 0 ||
                  boneMesh.name.indexOf('Finger_3') == 0 ||
                  boneMesh.name.indexOf('Finger_4') == 0) {
                  return {
                      hue: 0.34,
                      saturation: .8,
                      lightness: 0.5
                  }
              }
          } else if (numberToSign == 5){
              if (boneMesh.name.indexOf('Finger_1') == 0 ||
                  boneMesh.name.indexOf('Finger_2') == 0 ||
                  boneMesh.name.indexOf('Finger_3') == 0 ||
                  boneMesh.name.indexOf('Finger_4') == 0 ||
                  boneMesh.name.indexOf('Finger_0') == 0) {
                  return {
                      hue: 0.34,
                      saturation: .8,
                      lightness: 0.5
                  }
              }
          } else if (numberToSign == 6){
              if (boneMesh.name.indexOf('Finger_1') == 0 ||
                  boneMesh.name.indexOf('Finger_2') == 0 ||
                  boneMesh.name.indexOf('Finger_3') == 0 ) {
                  return {
                      hue: 0.34,
                      saturation: .8,
                      lightness: 0.5
                  }
              }
          } else if (numberToSign == 7){
              if (boneMesh.name.indexOf('Finger_1') == 0 ||
                  boneMesh.name.indexOf('Finger_2') == 0 ||
                  boneMesh.name.indexOf('Finger_4') == 0) {
                  return {
                      hue: 0.34,
                      saturation: .8,
                      lightness: 0.5
                  }
              }
          } else if (numberToSign == 8){
              if (boneMesh.name.indexOf('Finger_1') == 0 ||
                  boneMesh.name.indexOf('Finger_3') == 0 ||
                  boneMesh.name.indexOf('Finger_4') == 0) {
                  return {
                      hue: 0.34,
                      saturation: .8,
                      lightness: 0.5
                  }
              }
          } else if (numberToSign == 9){
              if (boneMesh.name.indexOf('Finger_2') == 0 ||
                  boneMesh.name.indexOf('Finger_3') == 0 ||
                  boneMesh.name.indexOf('Finger_4') == 0) {
                  return {
                      hue: 0.34,
                      saturation: .8,
                      lightness: 0.5
                  }
              }
          }
      }
    } //closes skill level loop
  }
})
.use('handEntry')
.use('playback', {
    recording: "recordings/" + numberToSign + ".json.lz",
    timeBetweenLoops: 1000
})
.on('handLost', function(hand){
    if (handPresent){
        handPresent = false
    } else {
        handPresent = true
    }
});
riggedHandPlugin = Leap.loopController.plugins.riggedHand;

//Function to decide if the user gets the hints on a given number attempt
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

function successRate(numberData){
    return Math.round(  (numberData["successes"]/(numberData["successes"] + numberData["failures"]))*100 );
}

//A function to assign a skill level based upon the number of times the user has signed a particular number.
var skillLevelGet = d3.scale.linear()
                      .domain([0,60])
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
