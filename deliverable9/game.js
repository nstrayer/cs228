var riggedHandPlugin;

var handPresent  = false,
    successful   = false,
    framesAfter  = 999,
    framesElapsed= 0,
    numberToSign = 0,
    currentlySigning,
    showHint     = true, //always show hints at first
    celebrating  = false,
    fail         = false,
    upTo         = findProgress(userValue), //The last digit that is allowed to be used.
    framesToGuess= 2000;
    console.log(upTo)

Leap.loop({

  hand: function(hand){

    var handMesh = hand.data('riggedHand.mesh');

    if (successful){ successful = false; } //change the succesfull to false to restart

    var fingers = hand.fingers,       //grab info on fingers for detecting numbers
        thumb   = fingers[0].extended,
        index   = fingers[1].extended,
        middle  = fingers[2].extended,
        ring    = fingers[3].extended,
        pinky   = fingers[4].extended;


    framesAfter++ //increment the frames after counter up 1
    if (framesAfter == 70){
        framesElapsed = 0
    } else {
        framesElapsed++ //increase framesElapsed
    }

    if        (framesAfter < 80 & fail){
        d3.select("body").style("background-color", "orange") //Make background orange
        d3.select("#reward").text("Let's try a different number.")
    } else if (framesAfter < 80 & !fail){ //If it's been less than 70 frames since success do success animation
        d3.select("body").style("background-color", "green") //Make background green
        d3.select("#reward").text("Good Job!")
    } else { //otherwise, restart the game with a new number to sign.
        d3.select("body").style("background-color", backgroundColor(framesElapsed)) //revert color of background
        d3.select("#reward").text("") //Get rid of good job message, it's serious again
        d3.select("#prompt").text("Try signing a " + numberToSign) //Update with new number to sign.
        d3.select("#numberCount").text("Signed " + userData[numberToSign] + " times" ) //Update with the number of times signed
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

    if (framesElapsed == framesToGuess){ //user runs out of time
        console.log("user has failed to sign the number")
        numberToSign  = chooseNewNumber(upTo); //re-choose a new number to sign, keeping in mind how far along the user is
        framesToGuess = howManyFrames(userData[numberToSign]) //Get how long the user has for the attempt
        if (framesToGuess < 300){framesToGuess = 300} //put a floor on it.
        framesAfter   = 1 // Start frames after counter for success visualization
        fail          = true
        showHint      = getHint(skillLevelGet(userData[numberToSign])) //Decide to show hint for next # or not.
        console.log("User is going to sign " + numberToSign + " and has " + framesToGuess + " frames to do it.")
    }
    //If the user has successfully signed the number assigned to them:
    if (currentlySigning == numberToSign){
        successful   = true          //turn on succesful switch for changing background color
        celebrating  = true          // Turn on celebrating to turn off finger hints, less confusing
        userData[currentlySigning]++ //increment the count for the signed number
        if (userData[upTo] > 5){upTo++} //if they have signed the current number 5 or more times, add a new #
        numberToSign  = chooseNewNumber(upTo); //re-choose a new number to sign, keeping in mind how far along the user is
        framesToGuess = howManyFrames(userData[numberToSign]) //Get how long the user has for the attempt
        if (framesToGuess < 300){framesToGuess = 300} //put a floor on it.
        framesAfter   = 1 // Start frames after counter for success visualization
        showHint      = getHint(skillLevelGet(userData[numberToSign])) //Decide to show hint for next # or not.
        console.log("User is going to sign " + numberToSign + " and has " + framesToGuess + " frames to do it.")
    }

    d3.select("#feedback").text(currentlySigning) //Update the gui to show the number they are currently signing

    var screenPosition = handMesh.screenPosition(
      hand.palmPosition,
      riggedHandPlugin.camera
    )

  }

})
// .use('riggedHand')
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
.on('handLost', function(hand){
    if (handPresent){
        handPresent = false
    } else {
        handPresent = true
    }
})
.use('playback', {
  recording: numberToSign + ".json.lz",
  timeBetweenLoops: 1000
});

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
    return number - 1;
}

function chooseNewNumber(max){ //Choose a new number for the user to sign
    var min = 0;
    if (max < 1){max = 1} //make sure the user isn't getting only zeros at the start.
    var newNumber = Math.floor(Math.random() * (max - min + 1)) + min
    while (newNumber == numberToSign){ newNumber = Math.floor(Math.random() * (max - min + 1)) + min}
    return newNumber;
}

//A function to assign a skill level based upon the number of times the user has signed a particular number.
var skillLevelGet = d3.scale.linear()
                      .domain([0,30])
                      .range([0,1])

var backgroundColor = d3.scale.linear()
                        .domain([0,framesToGuess]) //user gets 300 frames to guess correct
                        .range(["steelblue", "red"])

var howManyFrames = d3.scale.linear()
                      .domain([0,50])
                      .range([1000,300])

riggedHandPlugin = Leap.loopController.plugins.riggedHand;
