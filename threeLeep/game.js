var riggedHandPlugin;

function chooseNewNumber(){
    var max = 9,
        min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var handPresent = false,
    successful  = false,
    framesAfter = 999,
    numberToSign = 1,
    currentRecording = 'zero.json.lz';

Leap.loop({

  hand: function(hand){

    var handMesh = hand.data('riggedHand.mesh');

    if (successful){ //if the user succesfully signed the number
        successful = false; //change the succesfull to false to restart
    }

    var fingers = hand.fingers,       //grab info on fingers for detecting numbers
        thumb   = fingers[0].extended,
        index   = fingers[1].extended,
        middle  = fingers[2].extended,
        ring    = fingers[3].extended,
        pinky   = fingers[4].extended,
        currentlySigning;

    framesAfter++ //increment the frames after counter up 1

    if (framesAfter < 70){
        d3.select("body").style("background-color", "green")
        d3.select("#reward").text("Good Job!")

    } else {
        d3.select("body").style("background-color", "steelblue") //revert color of background
        d3.select("#reward").text("")
        d3.select("#prompt").text("Try signing a " + numberToSign)
        d3.select("#numberCount").text("Signed " + userData[numberToSign] + " times" )
        localStorage[userValue] = JSON.stringify(userData) //update the storage
    }
    //Where all the magic happens!
    if (thumb && !index && !middle && !ring && !pinky) {
        currentlySigning = 0
    } else if(!thumb && index  && !middle && !ring && !pinky){
        currentlySigning = 1
    } else if(!thumb && index  && middle && !ring && !pinky){
        currentlySigning = 2
    } else if (thumb && index  && middle && !ring && !pinky){
        currentlySigning = 3
    } else if (!thumb && index && middle && ring && pinky){
        currentlySigning = 4
    } else if (thumb && index  && middle && ring && pinky){
        currentlySigning = 5
    } else if (!thumb && index && middle && ring && !pinky){
        currentlySigning = 6
    } else if (!thumb && index && middle && !ring && pinky){
        currentlySigning = 7
    } else if (!thumb && index && !middle && ring && pinky){
        currentlySigning = 8
    } else if (!thumb && !index && middle && ring && pinky){
        currentlySigning = 9
    } else {
        currentlySigning = "_"
    }

    if (currentlySigning == numberToSign){
        userData[currentlySigning]++ //increment the count for the signed number
        successful = true
        numberToSign = chooseNewNumber(); //re-choose a new number to sign
        framesAfter = 1
        var control = new Leap.Controller()
        control.use('playback', {
              recording: numberToSign + ".json.lz",
              timeBetweenLoops: 1000
            });
    }

    d3.select("#feedback").text(currentlySigning)

    var screenPosition = handMesh.screenPosition(
      hand.palmPosition,
      riggedHandPlugin.camera
    )

  }

})
.use('riggedHand')
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

riggedHandPlugin = Leap.loopController.plugins.riggedHand;
