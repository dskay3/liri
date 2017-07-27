// Fetches of tokens & keys
var twitterKeys = require("./keys.js").twitterKeys;
var spotifyKeys = require("./keys.js").spotifyKeys;

var nodeArgs = process.argv;
var command = process.argv[2];

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
const chalk = require('chalk');
var moment = require('moment');

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
const spaces = "    ";

// Displays instructions
function instructions() {
    console.log(dashes);
    console.log("Hello. I am Liri.\n");
    console.log("Type the following into the terminal " + chalk.green("node liri.js") + " followed by one of the following commands:");
    console.log(spaces + chalk.bgBlue("my-tweets"));
    console.log(spaces + chalk.bgGreen("spotify-this-song"));
    console.log(spaces + chalk.bgRed("movie-this"));
    console.log(spaces + chalk.bgMagenta("do-what-it-says"));
    console.log(dashes);
};

instructions();

if (command == commands[0]) {
    myTweets();
}

if (command == commands[1]) {
    spotifyCall();
}

// Function that displays the latest tweet information for dskayy7
function myTweets() {
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var count = 0;

            // Displays screen name
            console.log("Retrieving " + chalk.bold.green(tweets[0].user.screen_name) + " tweets.");
            console.log(dashes);

            setTimeout(function() {
                // Go through and logs each tweet data
                tweets.forEach(function(tweet) {
                    console.log("Tweet Generated On: " + moment(tweet.created_at, "ddd MMM D HH:mm:ss ZZ YYYY").format("dddd, MMMM Do YYYY, h:mm:ss a"));
                    console.log("Tweet Text: " + chalk.blue(tweet.text));
                    console.log("Number of Times Favorited: " + tweet.favorite_count);
                    console.log(dashes);
                    count++;
                });
            }, 1500);
            
            setTimeout(function() {
                console.log(chalk.bgRed("Tweets data retrieval has been completed."));
                console.log(chalk.bold(count + " tweets were retrieved."));
            }, 3000);
        };
    });
};

// Shows information for spotify
function spotifyCall() {
    if (nodeArgs.length < 4) {
        spotifyClient.search({
            type: 'track',
            query: 'The Sign Ace of Base',
            limit: 1 
            },
            function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(chalk.bold("Name of Track: ") + data.tracks.items[0].name); 
                console.log(chalk.bold("Artist(s): ") + data.tracks.items[0].artists[0].name);
                console.log(chalk.bold("Song Album: ") + data.tracks.items[0].album.name);
                console.log(chalk.bold("Preview link: ") + data.tracks.items[0].external_urls.spotify);
            }
        );
    }
    else {
        spotifyClient.search({
            type: 'track',
            query: nodeArgs[3],
            },
            function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                for (var i = 0; i < (data.tracks.items).length; i++) {
                    console.log(chalk.bold("Name of Track: ") + data.tracks.items[i].name); 
                    console.log(chalk.bold("Artist(s): ") + data.tracks.items[i].artists[0].name);
                    console.log(chalk.bold("Song Album: ") + data.tracks.items[i].album.name);
                    console.log(chalk.bold("Preview link: ") + data.tracks.items[i].external_urls.spotify);
                    console.log(dashes);
                }
            }
        );
    }
};