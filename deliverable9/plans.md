# To Do:

* re-write file names so user is initially presented with the login screen: so…
	- welcome.html -> index.html,
	- index.html -> game.html

* game.html will use code from test.html to grab the user info from localStorage and load it into a current JSON variable. The loop for controlling the game will be modified to write and read from this data-structure. A counter variable will be added somewhere in the GUI.

* Utilize a timer function outside of the loop to check for changes in the displayed number. If it is detected it can change the value. May have to modularize all of the code inside the leap loop and re-call everything. 
