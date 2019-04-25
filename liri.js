// require packages
require("dotenv").config();
const Spotify = require('node-spotify-api');
const fs = require('fs');
const axios = require('axios');
const keys = require('./keys.js');
const moment = require('moment');


const spotify = new Spotify(keys.spotify); // initialize variable to hold spotify keys

const nodeArgs = process.argv;
const command = process.argv[2];
let userInput = '';
// merge user submitted input if string > 1 word
for (let i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    userInput = userInput + " " + nodeArgs[i];
  }
  else {
    userInput += nodeArgs[i];

  }
}

if (command === 'concert-this') {
  var queryUrl = 'https://rest.bandsintown.com/artists/' + userInput + '/events?app_id=codingbootcamp'
  axios.get(queryUrl).then (
    function(response) {
      for (let i = 0; i < response.data.length; i++) {
        console.log(`Venue: ${response.data[i].venue.name}`);
        console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
        console.log(`Date: ${response.data[i].datetime}`);
        console.log('------------------------------------');
      }
    }
  );
} else if (command === 'spotify-this-song') {

} else if (command === 'movie-this') {

} else if (command === 'do-what-it-says') {

} else {
  console.log('Command not recognized. Please try again');
}
