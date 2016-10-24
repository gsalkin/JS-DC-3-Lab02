var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
    id: String,
    name: String,
    genre: Array,
    desc: String,
    image: String,
    spfyURL: String
});

var Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
