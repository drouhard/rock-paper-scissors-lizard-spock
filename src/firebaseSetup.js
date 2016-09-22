const firebase = require("firebase");

const databaseURL = "https://rpsls-878cd.firebaseio.com/";

firebase.initializeApp({
  serviceAccount: "./firebase_key.json",
  databaseURL: databaseURL,
  databaseAuthVariableOverride: {
    uid: "rock-paper-scissors-lizard-spock"
  }
});

const db = firebase.database();

module.exports = {
    db,
    databaseURL
};
