const PORT = process.env.PORT || '80';
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./server/routes/api');
require('dotenv').config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use('/',express.static(path.join(__dirname, 'dist')));
app.listen(PORT, () => {
    console.log("SERVER STARTERD");
});
