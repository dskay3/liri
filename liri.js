// Exports of tokens & keys
const twitterKeys = require("assets/keys.js").twitterKeys;
const spotifyKeys = require("assets/keys.js").spotifyKeys;

var nodeArgs = process.argv;
var command = process.argv[2];

var twitterClient = new Twitter(twitterKeys);
var spotifyClient = new spotifyClient(spotifyKeys);

