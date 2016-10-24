function getArtist() {
    $('#artist-adder').on('submit', function(event) {
        event.preventDefault();
        var artist = $('input[name="artist"]').val();

        $.ajax({
            type: 'GET',
            url: buildURL(artist,null),
            success: function (data) {
                var cleanURL = data.artists.items[0].href;
                $.ajax({
                    type: 'GET',
                    url: cleanURL,
                    success: function(cleanData) {
                        $.ajax({
                            type: 'POST',
                            url: '/artists',
                            data: cleanData
                        });
                    }
                });
                $('input[name="artist"]').val('');
                alert('Artists Added!');
            },
            error: function() {
                $('input[name="artist"]').val('');
                alert("Sorry, we couldn't find any artist with that name.  Try again.");
            }
        });
    });
}

function getSong() {
    $('#song-adder').on('submit', function(event) {
        event.preventDefault();
        var song = $('input[name="song"]').val();
        $.ajax({
            type: 'Get',
            url: buildURL(null,song),
            success: function(data){
                var cleanURL = data.tracks.items[0].href;
                $.ajax({
                    type: 'GET',
                    url: cleanURL,
                    success: function(cleanData) {
                        $.ajax({
                            type: 'POST',
                            url: '/songs',
                            data: cleanData
                        });
                    }
                });
                $('input[name="song"]').val('');
                alert('Song Added!');
            }
        });
    });
}

// function editEntry() {
//     $('#delete').on('click', function(event) {
//         event.preventDefault();
//         $.ajax({
//             type: 'PUT',
//             url: jmee,
//         });
//     });
// }

function buildURL(artist,song) {
    var baseURL = 'https://api.spotify.com/v1/search?q=';
    if(artist) {
        baseURL += artist;
        baseURL += '&type=artist';
    }
    else if(song) {
        baseURL += song;
        baseURL += '&type=track';
    }
    return baseURL;
}
