const PORT = process.env.PORT || '80';
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const apiRoutes = require('./server/routes/api');
require('dotenv').config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((req, res, next)=>{
    req.body.date = req.body.date ? moment(req.body.date).format("YYYYMMDD") : "latest";
    next();
});
app.use('/api', apiRoutes);
app.use('/',express.static(path.join(__dirname, 'dist')));

app.use((err, req, res, next)=>{
    console.log(err);
    const message = err.message;
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: message
    })
});

app.listen(PORT, () => {
    console.log("SERVER STARTERD");
});

module.exports = app