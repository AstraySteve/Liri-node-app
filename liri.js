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
var input = process.argv[2];

//Functions
myTweets = () => {
    /*TODO*/
    //Function that shows the last 20 tweets and when they were created to terminal/bash
    var param = {
        name: "RougeZero",
        count: 20,
    };
    //Twitter test code
    client.get('statuses/user_timeline', param, function(error, tweets, response){
        if(error){
            console.log(error);
        }
        //TODO: make for look to loop through tweets
        console.log(tweets[0].created_at);
        console.log(tweets[0].text);
        //console.log(response);
    });
}

getSong = () => {
    //Function determines what song to look up
    if(process.argv.length < 4){
        var songName = "The Sign, Ace of Base";
        songInfo(songName);
    }
    else{
        var songName = process.argv[3];
        songInfo(songName);
    }
}
songInfo = (songName) => {
    //Function request to Spotify API and displays information: Artist, Song name, Preview link, Album.
    spotify.search({type: 'track', query: songName, limit: 1}, function(err,data){
        if(err){
            console.log("Error occurred: " + err);
        }
        else{
            if(data.tracks.items.length > 0){
                var info = data.tracks.items[0];
                console.log(`Artist(s): ${info.artists[0].name}\nTrack: ${info.name}`);
                console.log(`Preview: ${info.preview_url}\nAlbum: ${info.album.name}`);
            }
            else{
                console.log("Song not found!");
            }
        }
    });
}

getMovie = () => {
    //Function determines what movie to look up
    if (process.argv.length < 4){
        var movieName = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody.' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
        movieInfo(movieName);
    }
    else{
        var movieName = process.argv[3];
        movieInfo(movieName);
    }
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

switch(input){
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        getSong();
        break;
    case "movie-this":
        getMovie();
        break;
    case "do-what-it-says":
        //something
        break;
    default:
        console.log("invalid command!");
}

