# rock-paper-scissors-lizard-spock
An implementation of Rock, Paper, Scissors, Lizard, Spock

## Installation
1. Clone this repo.
2. Change `src/firebaseSetup.js` to use your database and service account.
3. Run `npm i` to install dependencies.
4. Run `npm run build` to compile the front end javascript
5. Start the Node server using `nodemon index.js`
6. The game is available at http://localhost:5000/

## Credits
Thank you to Google Firebase, and especially to this writeup of using promises with Firebase:
https://firebase.googleblog.com/2016/01/keeping-our-promises-and-callbacks_76.html


## TODOs
* Beef up testing.
* Add animation or spinner for front end when waiting for results.
* Sanitize user-submitted names for db storage (e.g. no "[]\/{}()").
* DRY up the win/loss/tie functions in index.js.
* Figure out a way to limit number of "active" users in database (websockets, perhaps?)
* Notify client when high score achieved on a win, not just a loss.
* Front end: show the user that they got a high score.
