require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { json } = require('express');
const bodyParser = require("body-parser");
const router = express.Router();

global.sequelize = require('./database/mysql');
global.sendResponse = require('./support/send-response');

const app = express();
const port = process.env.APP_PORT || 3001;

app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: false })); 
app.use('/public', express.static(path.join(__dirname, 'public')));

sequelize.sync()
  .then(() => {
    console.log("Berhasil connect ke db!");
  })
  .catch(err => {
    console.error("Error creating database:", err);
});


app.get('/api/v1', (req, res) => {
    res.send('Welcome!');
});

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


module.exports = app;