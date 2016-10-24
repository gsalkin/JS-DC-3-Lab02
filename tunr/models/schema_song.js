var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new Schema({
    id: String,
    name: String,
    album: String,
    artist: String,
    art: String,
    audioURL: String,
    desc: String,
});

var Song = mongoose.model('Song', songSchema);
module.exports = Song;
