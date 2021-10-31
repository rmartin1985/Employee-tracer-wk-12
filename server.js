const inquirer = require('inquirer');
const mysql = require('mysql2');
const conTable = require('console.table');
const express = require('express');
const { startTracker } = require('./lib/index');

const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen( PORT, () => {
    console.log(`Server now on port ${PORT}!`);
});

startTracker();