require('dotenv').config();

const mongoString = process.env.DATABASE_URL;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(express.json());
app.use(cors())

const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(8000, () => {
    console.log(`Server Started at ${8000}`)
})