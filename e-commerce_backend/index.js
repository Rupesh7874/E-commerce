const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const http = require('http');
const path = require('path');

dotenv.config();
require('./confige/db')();
require('./utils/cron');

// ✅ Enable CORS
app.use(cors({
    origin: "http://localhost:3000",  // allow frontend
    methods: "GET,POST,PUT,DELETE",   // allowed methods
    credentials: true                 // allow cookies if needed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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