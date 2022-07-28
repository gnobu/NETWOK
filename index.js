const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const path = require('path');
const { PORT } = process.env;


const DB_INIT = require('./models');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const postRoutes = require('./routes/postRoutes');
const eventEmitter = require('./helpers/eventEmitter');
// const { responseObject } = require('./helpers/responseObject');


const app = express(); // INSTANCE OF SERVER.

DB_INIT(() => {

    // ALLOWS BODY PARSING OF REQUESTS WITH JSON.
    app.use(bodyParser.json({ limit: "30mb", extended: true }));
    app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
    app.use(cors());
    app.use(cookieParser());

    // ROUTE HANDLERS.
    app.use('/auth', authRoutes);
    app.use('/api', apiRoutes);
    app.use('/post', postRoutes);
    
    // SERVE BUILD AS A STATIC FILE.
    app.use(express.static(path.join(__dirname, "build")));
    
    // LET REACT HANDLE UNKNOWN ROUTES.
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })


    // Error handler
    app.use((error, req, res, next) => {
        console.log("INDEX ERROR HANDLER", error.message);
        eventEmitter.emit('error-log', error.message)
        // res.json(responseObject(null, false, error?.message));
    });

    // SERVER LISTENING ONCE CONNECTED TO DB.
    app.listen(PORT, () => {
        console.log(`Connected to DB and Listening on port ${PORT}...`);
    })
})
