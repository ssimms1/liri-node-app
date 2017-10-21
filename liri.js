// Node module imports needed to run the functions
var fs = require("fs"); //reads and writes files
var request = require("request"); // Used to connect to APIs
var keys = require("./keys.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var liriArgument = process.argv[2]; // allows user to pass arguments to the command line
// ---------------------------------------------------------------------------------------------------------------
// Possible commands for this liri app
switch (liriArgument) {
    case "my-tweets":
        aliasTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
        // Instructions displayed in terminal to the user
    default:
        console.log("\r\n" + "Type the following commands after 'node liri.js' : " + "\r\n" +
            "1. my-tweets 'any twitter name' " + "\r\n" +
            "2. spotify-this-song 'any song name' " + "\r\n" +
            "3. movie-this 'any movie name' " + "\r\n" +
            "4. do-what-it-says." + "\r\n" +
            "Put the movie or song name in quotation marks if it's more than one word.");
};
// ---------------------------------------------------------------------------------------------------------------
// Functions
// uses the Request module to call the OMDB api
function movieThis() {
    var movie = process.argv[3];
    if (!movie) {
        movie = "mr nobody";
    }
    params = movie
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            //console.log(movieObject); // Show the text in the terminal
            var movieResults =
                "------------------------------ begin ------------------------------" + "\r\n"
            "Title: " + movieObject.Title + "\r\n" +
                "Year: " + movieObject.Year + "\r\n" +
                "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
                "Country: " + movieObject.Country + "\r\n" +
                "Language: " + movieObject.Language + "\r\n" +
                "Plot: " + movieObject.Plot + "\r\n" +
                "Actors: " + movieObject.Actors + "\r\n" +
                "------------------------------ fin ------------------------------" + "\r\n";
            console.log(movieResults);
            log(movieResults); // calling log function
        } else {
            console.log("Error :" + error);
            return;
        }
    });
};
// uses the Twitter module to call the Twitter api
function aliasTweets() {
    var client = new twitter(keys.twitter);
    var params = {
        screen_name: 'Aliaslac'
    };
    client.get("statuses/user_timeline/", params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var twitterResults =
                    "@" + tweets[i].user.screen_name + ": " +
                    tweets[i].text + "\r\n" +
                    tweets[i].created_at + "\r\n" +
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
                log(twitterResults); // calling log function
            }
        } else {
            console.log("Error :" + error);
            return;
        }
    });
}
// uses the Spotify module to call the Spotify api
function spotifyThisSong(songName) {
    var spotify = new Spotify(keys.spotify);
    var songName = process.argv[3];
    if (!songName) {
        songName = "Too good at goodbyes";
    }
    params = songName;
    spotify.search({
        type: "track",
        query: params
    }, function (err, data) {
        if (!err) {
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                        "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                        "Song: " + songInfo[i].name + "\r\n" +
                        "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                        "Preview Url: " + songInfo[i].preview_url + "\r\n" +
                        "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(spotifyResults);
                    log(spotifyResults); // calling log function
                }
            }
        } else {
            console.log("Error :" + err);
            return;
        }
    });
};
//uses the reads and writes module to access the random.txt file and do what's written in it
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            doWhatItSaysResults = data.split(",");
            spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};
//reads and writes module to access the log.txt file and write everything that returns in terminal in the log.txt file
function log(logResults) {
    fs.appendFile("log.txt", logResults, (error) => {
        if (error) {
            throw error;
        }
    });
}