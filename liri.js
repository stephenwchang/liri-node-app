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
  var queryUrl = `https://rest.bandsintown.com/artists/${userInput}/events?app_id=codingbootcamp`
  axios.get(queryUrl).then(
    function(response) {
      for (let i = 0; i < response.data.length; i++) {
        console.log(`Venue: ${response.data[i].venue.name}`);
        console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
        console.log(`Date: ${moment(response.data[i].datetime).format('MM/DD/YYYY, h:mm a')}`);
        console.log('------------------------------------');
      }
    }
  );
} else if (command === 'spotify-this-song') {
  if (userInput === '') {
    userInput = 'The Sign, Ace of Base';
  }
  spotify.search({ type: 'track', query: userInput }).then(
    function(response) {
    console.log(`Artist: ${response.tracks.items[0].artists[0].name}`);
    console.log(`Song: ${response.tracks.items[0].name}`);
    console.log(`Spotify URL: ${response.tracks.items[0].external_urls.spotify}`);
    console.log(`Album: ${response.tracks.items[0].album.name}`);
  })
  .catch(function(err) {
    console.log(err);
  });
} else if (command === 'movie-this') {
  if (userInput === '') {
    userInput = 'Mr. Nobody';
  }
  var queryUrl = `http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=trilogy`;
  axios.get(queryUrl).then (
    function(response) {
      console.log(`Title: ${response.data.Title}`);
      console.log(`Year: ${response.data.Year}`);
      console.log(`IMDB: ${response.data.Ratings[0].Value}`);
      console.log(`Rotten Tomatoes: ${response.data.Ratings[1].Value}`);
      console.log(`Country: ${response.data.Country}`);
      console.log(`Language(s): ${response.data.Language}`);
      console.log(`Plot: ${response.data.Plot}`);
      console.log(`Cast: ${response.data.Actors}`);

    }
  );


} else if (command === 'do-what-it-says') {

} else {
  console.log('Command not recognized. Please try again');
}
