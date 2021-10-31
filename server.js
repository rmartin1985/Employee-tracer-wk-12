const inquirer = require('inquirer');
const mysql = require('mysql2');
const conTable = require('console.table');

const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3006

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen( PORT, () => {
    console.log(`Server now on port ${PORT}!`);
    startTracker();
});