# Plan of Development

### Determine Data Models Needed
* First step is determining what kind of data I will need
 * Create a schema for two types of data: songs and artists

### Examine API
* Learning the spotify API requires examining the documentation
 * Create a basic API call from the documentation and examine the JSON that is created.
 * From this sample JSON you can determine what information you will want to call back.
* This dummy data can be used to inform your schemas above.

### Build out Application Framework
* Create the necessary folders and structures
 * `Views` folder for Handlebars
 * `public` folder for static css and js
 * `index.js` file for app controller

### Start NPM and install dependencies
* Create your node project using `npm init` and fill out the requested info
* Install dependencies
 * `express`, `express-handlebars`, `body-parser`, `mongoose`, `nodemon` - for development

### Create Initial routes.
* Create a basic express route in order to ensure app will run.
 * ```javascript
 var express = require('express');
 var app = express();
 app.get('/', function(req,res) {
     res.render('index');
 });```

 * Other dependencies that must be `require`d include: ```javascript
 var hbs = require('express-handlebars');
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 var Song = require('./models/schema_song.js');
 var Artist = require('./models/schema_artist.js');
 ```
* Set up `Handlebars` as the template engine

### Initialize App and connect to MongoDB
* Using `nodemon` and connecting `mongoose` to the necessary port via `mongod`, you can start the server and connect it to the database.
* This will ensure that the app is connected and will later allow you to add and retrieve data.

### Create your Layouts
* Once Handlebars is set up as the template engine, create your basic layouts and assign them as the defaultLayout and `index` files
 * This will ensure Handlebars is working and provide visual feedback for the user.
* CSS and styling can be applied at this time (though app functionality is more important than style)
* Handlebars files include a form for entering data, headers, footers, navigation, lists of songs and artists, as views for Individual songs and artists

### Create Data Interaction via AJAX
* `main.js` will be the client-based interaction controller.
* Using `JQuery` you can make AJAX calls that take the text entered in the inputs and preform API calls to Spotify
 * The data returned is very complex, so I have simplified the data returned with additional AJAX calls that strip unneeded data from the JSON.
* This data is the `POST`ed to the the necessary HTTP route defined in the `index.js` file

### Create Individual Entry
* Create routes for Individual song and artist entries
* Database searches are performed by searching for an entry with a matching `name` for artists
 * Songs are retrieved by searching for the matching, unique `spotify id`
* Connect routes to the specified views in order to have a more detailed appearance for the user

### Create Edit Views, Routes and Functionality
