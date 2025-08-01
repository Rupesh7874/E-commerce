const express = require('express');
const app = express();
const dotenv = require('dotenv');
const http = require('http');

dotenv.config();
require('./confige/db')();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware to log request details after response is sent
app.use((req, res, next) => {
    res.on("finish", () => {
        console.log(req.method + " - " + req.originalUrl + " - " + res.statusCode);
    });
    next();
});

const apiV1routs = require('./routs/index.routs');
app.use('/api/v1', apiV1routs);

const PORT = process.env.PORT || 5000; 
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log("server running sucessfully on port", PORT);
})