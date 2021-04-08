const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/db');
const app = express();
require('dotenv').config();

//Database connection
dbConnection();

//CORS
app.use(cors());

app.use(express.json());

//Routes
app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
});