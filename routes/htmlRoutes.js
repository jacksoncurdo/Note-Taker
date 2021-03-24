let path = require("path");

// Using the GET method we are sending the user a html page 
// GET is an Express method, one of the methods included in CRUD
module.exports = (app) => {

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // If there is not a matching route then the default will be home
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};