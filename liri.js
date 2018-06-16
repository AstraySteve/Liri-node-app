require("dotenv").config(); //npm dotenv
//TODO all require and imports here
var keys = require("./keys.js");
var fs = require("fs");

//TODO ALL NPM IMPORTS HERE
var Twitter = require('twitter'); //npm twitter
var client = new Twitter(keys.twitter);

var request = require('request'); //npm request

//console.log(keys);

/*TODO
var Spotify = require('node-spotify-api'); //npm spotify
var spotify = new Spotify(keys.spotify);


*/

//Functions
myTweets = () => {
    //Function that shows the last 20 tweets and when they were created to terminal/bash
    var param = {
        q: "#node.js",
        count: 20,
        result_type: "recent"
    };
    //Twitter test code
    client.get('search/tweets', param, function(error, tweets, response){
        if(error){
            console.log(error);
        }
        console.log(tweets);
        //console.log(tweets.text);
        //console.log(response);
    });
}

movieInfo = () => {
    //Function will call OMDB and display movie info to terminal/bash
    if (process.argv.length < 4){
        var movieName = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody.' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
        getMovie(movieName);
    }
    else{
        var movieName = process.argv[3];
        getMovie(movieName);
    }
}

getMovie = (movieName) => {
    /*Function will request OMDB and output the following info: Title, Year of release, IMDB rating,
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
                console.log(info.Error);
            }
        }
    });
}

var input = process.argv[2];
switch(input){
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        //something
        break;
    case "movie-this":
        movieInfo();
        break;
    case "do-what-it-says":
        //something
        break;
    default:
        console.log("invalid command!");
}

