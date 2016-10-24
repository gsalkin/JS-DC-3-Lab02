// Set up dependencies and node modules
var express = require('express');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Song = require('./models/schema_song.js');
var Artist = require('./models/schema_artist.js');

//Utils

// Connect database to application controller
mongoose.connect('mongodb://localhost:27017/tunr');
var app = express();

// Set up default views path for design
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Establish static assets location
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

// Set up routes for HTTP requests

app.get('/', function(req,res) {
    res.render('index');
});

app.get('/artists', function(req,res) {
    Artist.find({}, function(err, artists) {
        res.render('artists/artists', {artists: artists});
    });
});

app.get('/artists/:id', function(req,res) {
    Artist.findOne({'name': req.params.id}, function(err, artist) {
        res.render('artists/artist', {artist: artist});
    });
});

app.get('/songs', function(req,res) {
    Song.find({}, function(err, songs) {
        res.render('songs/songs', {songs: songs});
    });
});

app.get('/songs/:id', function(req,res) {
    Song.findOne({'id': req.params.id}, function(err, song) {
        res.render('songs/song', {song: song});
    });
});

app.post('/artists', function(req,res){
    var newArtist = new Artist({
        id: req.body.id,
        name: req.body.name,
        genre: req.body.genres,
        image: req.body.images[2].url,
        spfyURL: req.body.external_urls.spotify
    });
    newArtist.save();
    res.redirect('/');
});
// 
// app.post('/artists/edit/:id', function(req, res) {
//     Artist.findOne({'name': req.params.id}, function(err, artist) {
//
//     });
// });

app.post('/songs', function(req,res){
    var newSong = new Song({
        id: req.body.id,
        name: req.body.name,
        album: req.body.album.name,
        artist: req.body.artists[0].name,
        art: req.body.album.images[1].url,
        audioURL: req.body.preview_url
    });
    newSong.save();
    res.redirect('/');
});

app.listen(3000, function() {
    console.log("Let's rock!");
});
