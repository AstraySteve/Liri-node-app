/*
    Steven Tran
    Assignment 10, 2018
    UofT SCS Coding Bootcamp
*/

//require npm imports
require("dotenv").config(); //npm dotenv
var request = require('request'); //npm request
var Twitter = require('twitter'); //npm twitter
var Spotify = require('node-spotify-api'); //npm spotify
var fs = require("fs");
//Custom imports
var keys = require("./keys.js");

//Global Variables
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var input = process.argv.slice(2);

//Functions
myTweets = () => {
    //Function that shows the last 20 tweets and when they were created to terminal/bash
    var param = {
        name: 'RougeZero',
        count: 20,
    };
    client.get('statuses/user_timeline', param, function(error, tweets, response){
        if(error){
            console.log(error);
        }
        for (var i=0; i<tweets.length; i++){
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
            console.log("----------------------");
        }
        //console.log(response);
    });
}

songInfo = (songName) => {
    /*Function request to Spotify API and displays the following info:
      Artist, Song name, Preview link, Album.*/
    if(songName == null){
        songName = "The Sign, Ace of Base";
    }
    spotify.search({type: 'track', query: songName, limit: 1}, function(err,data){
        if(err){
            console.log("Error occurred: " + err);
        }
        else{
            if(data.tracks.items.length > 0){
                //Song found
                var info = data.tracks.items[0];
                console.log(`Artist(s): ${info.artists[0].name}\nTrack: ${info.name}`);
                console.log(`Preview: ${info.preview_url}\nAlbum: ${info.album.name}`);
            }
            else{
                //Song not found
                console.log("Song not found!");
            }
        }
    });
}

getMovie = (movieName) => {
    //Function determines what movie to look up
    if (movieName == null){
        movieName = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody.' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }
    movieInfo(movieName);
}
movieInfo = (movieName) => {
    /*Function will request to OMDB and output the following info: Title, Year of release, IMDB rating,
      Rotten Tomatos Rating, Country of production, Lanugage, Plot, Actors*/
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    //console.log(queryURL); //DEBUG CODE
    request(queryURL, function(error, response, body){
        // If the request is successful
        if(!error && response.statusCode === 200){
            var info = JSON.parse(body);
            if(info.Response == "True"){
                //Movie found
                console.log(`Title: ${info.Title}\nYear: ${info.Year}\nIMDB Rating: ${info.Ratings[0].Value}`);
                console.log(`Rotten Tomatoes Rating: ${info.Ratings[1].Value}\nCountry: ${info.Country}\nLanguage: ${info.Language}`);
                console.log(`Plot: ${info.Plot}\nActors: ${info.Actors}`);
            }
            else{
                //Movie not found
                console.log(info.Error);
            }
        }
    });
}

randomCommand = () => {
    //Function takes the text inside of random.txt and then use it to call one of LIRI's commands.
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        /*TODO make random truly random*/
        var dataArgs = data.split(',');
        //console.log(dataArgs); //DEBUG CODE
        liriMain(dataArgs);
    });
}

liriMain = (command) => {
    switch(command[0]){
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            songInfo(command[1]);
            break;
        case "movie-this":
            getMovie(command[1]);
            break;
        case "do-what-it-says":
            randomCommand();
            break;
        default:
            console.log("invalid command!");
    }
}

liriMain(input);