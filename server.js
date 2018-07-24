const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require("path");
const users = require('./routes/api/users');

const app = express();

app.get('/', (req, res) => res.send('Hello World'));

app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);