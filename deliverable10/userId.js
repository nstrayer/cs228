console.log("userId loaded")

var userValue;

try{
  userValue = window.location.href.split("?")[1].replace("/","") //grab the user's name
  scores    = localStorage.getItem(userValue) //get the scores in string form

  d3.select("#userName").text(userValue) //greet the user

  if (scores == null){ //if it is the user's first time create an entry

      newUser =  {"logins": 0, "lastSuccessRate": 0,
                  0: [], 1: [], 2: [], 3: [], 4: [],
                  5: [], 6: [], 7: [], 8: [], 9: []
                 } //initialize the user's values. Empty vectors for recording each attempt: 1 = success 0 = failure.

      localStorage[userValue] = JSON.stringify(newUser) //send local storage their values
      scores = localStorage[userValue] //get the score from local storage

      console.log("new user") //Let the console know this is a new user
  }

} catch (err){ //catch an error

  console.log("It didn't work :(")

}

userData = JSON.parse(scores)
userData.logins++
localStorage[userValue] = JSON.stringify(userData)
