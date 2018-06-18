# Liri-node-app
Liri (Language Interperetation and Recognition Interface)
command line node app

#### Commands
* my-tweets
    * my-tweets will display the last 20 tweets and when they were created to the terminal/bash window
* spotify-this-song 'song name (optional)'
    * This will show the following information of the song in the terminal/bash window
        * Artist(s)
        * Song's name
        * Preview link
        * Album song was from
    * If no song name was provided it will default to 'The Sign' by Ace of Base
* movie-this 'movie name (optional)'
    * This will output the following infomation of the movie to the terminal/bash window
        * Title
        * Year of release
        * IMDB rating
        * Rotten Tomatoes Rating
        * Country of origin
        * Languague
        * Plot
        * Actors
    * If no movie name was provided it will default to "Mr. Nobody"
* do-what-it-says
    * reads from file random.txt and runs command provided in the file
    * commands could be any of the above 3

#### Features
a log.txt will be created upon running liri.js, it will store every command inputed and every outputted messages

#### Important
You will need to provide your own keys in a .env file inorder to use the twitter or spotify commands

#### Dependencies
* Twitter: https://www.npmjs.com/package/twitter
* Node-Spotify-API: https://www.npmjs.com/package/node-spotify-api
* Request: https://www.npmjs.com/package/request
    *OMDB API: http://www.omdbapi.com/
* DotEnv: https://www.npmjs.com/package/dotenv