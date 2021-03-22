// I'm naming express and app as constants, requiring express, and setting the port on 8080 
const express = require('express');
const app = express();
// I don't really understand the difference between port numbers but I have seen 8080 used before so I went with that.
const PORT = process.env.PORT || 8080;

// Returning json using express 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Using express to deliever static files 
app.use(express.static("public"));

// Requiring the files 
require ('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


// Telling the server to listen 
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});