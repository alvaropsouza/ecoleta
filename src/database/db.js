// Import sqlite dependencies
const sqlite3 = require("sqlite3").verbose()

// Create a database object that will operate on database
const db = new sqlite3.Database("./src/database/database.db")

