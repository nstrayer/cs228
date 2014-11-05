console.log("userId loaded")

var userValue;

try{
  userValue = window.location.href.split("?")[1].replace("/","") //grab the user's name
  scores    = localStorage.getItem(userValue) //get the scores in string form

  d3.select("#userName").text("Welcome, " + userValue) //greet the user

  if (scores == null){ //if it is the user's first time create an entry

      newUser = {"logins": 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
                              5: 0, 6: 0, 7: 0, 8: 0, 9: 0 } //initialize the user's values.

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
