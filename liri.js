// Exports of tokens & keys
const twitterKeys = require("./keys.js").twitterKeys;
const spotifyKeys = require("./keys.js").spotifyKeys;

var nodeArgs = process.argv;
var command = process.argv[2];

var twitterClient = new Twitter(twitterKeys);
var spotifyClient = new spotifyClient(spotifyKeys);

