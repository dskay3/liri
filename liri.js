// Fetches of tokens & keys
var twitterKeys = require("./keys.js").twitterKeys;
var spotifyKeys = require("./keys.js").spotifyKeys;

var nodeArgs = process.argv;
var command = process.argv[2];

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
const chalk = require('chalk');

var twitterClient = new Twitter(twitterKeys);
var spotifyClient = new Spotify(spotifyKeys);

var params = {
    screen_name: 'dskayy7',
    count: 20
};

// Commands for Liri
var commands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];

// Constants
const dashes = '-----------------------------------------------------';

// Displays instructions
function instructions() {
    console.log(dashes);
    console.log("Hello. I am Liri.\n");
    console.log("Type the following into the terminal " + chalk.green("node liri.js") + " followed by one of the following commands");
    console.log(chalk.bgBlue("my-tweets"));
    console.log(chalk.bgGreen("spotify-this-song"));
    console.log(chalk.bgRed("movie-this"));
    console.log(chalk.bgMagenta("do-what-it-says"));
    console.log(dashes);
};

instructions();

if (command == commands[0]) {
    myTweets();
}

function myTweets() {
    console.log("Retrieving the last 20 tweets.");

    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}