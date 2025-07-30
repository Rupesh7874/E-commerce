const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("mongodb connected sucessfully");
        })
        .catch(err => console.log(err.message));

    mongoose.connection.on('connected', () => { //this code try to reconnected when server disconnected
        console.log("mongoose connected to mongodb");
    })
    mongoose.connection.on('error', err => {
        console.log(err.message);
    })
    mongoose.connection.on('disconnected', err => {
        console.log("mongoose conection disconnected"); 
    })
    // Event listener for SIGINT signal (typically sent from the terminal)(ctrl+c).
    // This is used to handle graceful shutdown of the application.
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0); // Exit the process after closing the connection
        });
    });
}