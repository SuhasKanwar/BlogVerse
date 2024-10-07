const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


const app = express();
const PORT = 9000 || process.env.PORT;

// Connection
mongoose.connect("mongodb://127.0.0.1:27017/BlogVerse")
    .then(() => { console.log("MongoDB Connected Successfully") })
    .catch((error) => { console.log("Error connecting MongoDB", error) });

// Setting up path and view engine
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express.static('./assets'));
app.use(express.static('./scripts'));

// Middlewares
const { logReqRes } = require('./middlewares/log');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));

// Routing
const staticRouter = require('./routes/index');

app.use('/', staticRouter);

app.listen(PORT, (error) => {
    if(error){
        console.log("Error connecting with server", error);
    }
    else{
        console.log(`Server is listening on port -> ${PORT}`);
        console.log(`\n\nhttp://localhost:${PORT}\n\n`);
    }
})