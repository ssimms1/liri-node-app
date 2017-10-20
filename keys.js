console.log('this is loaded');

//twitterKey
var twitter = {
  consumer_key: '9TLcBcCsp6yYvpO9xmczcQtyB',
  consumer_secret: 'W7kCaApo97lCEAGvGloBzXVxpwiJDSmQgs7c6JiVmQAX83Zvks',
  access_token_key: '918691237493858304-9U780uEVLN9sFGz30LPP2kb2ifpPy08',
  access_token_secret: 'KkYJXS3P0GV29l6sSZzd1rHJ1280AQyX9jcktE3qSGYl3',
}

 
var params = {screen_name: 'Alias'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
//spotifyKeys
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "a618c51f9d4444fdb4f58c586dd27308",
  secret: "5157462a446c4be0b091e2ac47780305",

});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

module.exports = twitterKeys;

// Client ID


