// Require all dependencies
var express = require('express')
var hbs = require('express-handlebars')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')


// Setup connection to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/tunr-solution')

var Artist = require('./models/artists')
var Song = require('./models/songs')


// Create the Express app() and do some setup
var app = express()
app.use( express.static('public') )
app.use( bodyParser.urlencoded({ extended: true }) )

app.engine( 'handlebars', hbs({ defaultLayout: 'default' }) )
app.set( 'view engine', 'handlebars' )



/*

  Routes

*/
app.get('/', function( req, res ) {

  Artist.find({}, function( err, artists ) {

    res.render('index', { artists: artists })

  })

})

// Artist Routes
app.get('/artists', function( req, res ) {

  console.log('here')

  res.redirect('/')

})

app.post('/artists', function( req, res ) {

  var data = JSON.parse( req.body.data );

  var newArtist = new Artist({
    name: data.name,
    imageUrls: data.images,
    spotifyId: data.id,
    genres: data.genres
  })

  newArtist.save()

  res.status(200).send('success')

})

app.get('/artists/new', function( req, res ) {

  res.render('artists/new')

})

app.get('/artists/:id', function( req, res ){

  Artist.findById(req.params.id, function( err, artist ) {

    res.render('artists/artist',  artist)

  })

})

app.post('/artists/edit', function( req, res ) {

  Artist.findById(req.body.id, function( err, artist ) {

    artist.name = req.body.name
    artist.description = req.body.description
    artist.save()

    res.redirect('/artists/' + artist.id )

  })

})

app.get('/artists/edit/:id', function( req, res ) {

  Artist.findById(req.params.id, function( err, artist ) {

    res.render('artists/edit', artist)

  })

})

// Songs
app.get('/songs', function( req, res ) {

  Song.find({}, function( err, songs) {

    res.render('songs', {songs: songs})

  })

})

app.post('/songs', function( req, res ) {

    var data = JSON.parse( req.body.data );

    var newSong = new Song({
      title: data.name,
      artist: data.artists[0].name,
      album: data.album.name
    })

    newSong.save()

    res.status(200).send('success')

})

app.get('/songs/new', function( req, res ) {

  res.render('songs/new')

})

app.get('/songs/:id', function( req, res ) {

  Song.findById(req.params.id, function( err, song ) {

    res.render('songs/song', song)

  })

})

app.post('/songs/edit', function( req, res ) {

  Song.findById(req.body.id, function( err, song ) {

    song.name = req.body.name
    song.description = req.body.description
    song.save()

    res.redirect('/songs/' + song.id )

  })

})

app.get('/songs/edit/:id', function( req, res ) {

  Song.findById( req.params.id, function( err, song ) {

    res.render('songs/edit', song)

  })

})



// Listen on port 3000
app.listen( 3000, function() { console.log( 'server is running ' ) } )
