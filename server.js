// I'm naming express and app as constants, requiring express, and setting the port on 8080 
const express = require('express');
const app = express();
// I don't really understand the difference between port numbers but I have seen 8080 used before so I went with that.
const PORT = process.env.PORT || 8080;

