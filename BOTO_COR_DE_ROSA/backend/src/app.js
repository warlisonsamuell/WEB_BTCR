const express = require('express');
const cors = require('cors');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

module.exports = app;
