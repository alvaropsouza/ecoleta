// Import sqlite dependencies
const sqlite3 = require("sqlite3").verbose()

// Create a database object that will operate on database
// The dot before src means that we are starting the path ate our root folder (nlw)
const db = new sqlite3.Database("./src/database/database.db")

// Use database object for our operational
// db.serialize runs codes in a row with a function
db.serialize( () => {
    // With sql commands i will:
    // 1 create a table(Ex: clients, provinces, citys)
    // Muste use crasis `` in order to 'split' the function 'run'
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // 2 Insert data on table
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);       
    `

    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

     // 3 Search data on table
     /* db.all(`SELECT name FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows);
        
    })     */

    // 4 Delete data on table
    /* db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
        
    }) */
})

