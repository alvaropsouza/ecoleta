const express = require("express")  
const server = express()

// Grab database
const db = require("./database/db.js")

// Config 'public' folder, so the server can reach its children folders > assets, styles and scripts
server.use(express.static("public"))

// Make our express be able to use req.body on our application
server.use(express.urlencoded({ extended: true }))

// Using Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Config my application PATH
// HOME PAGE
// req = requisition
// res = response
server.get("/", (req, res) => {
    return res.render("index.html")
})


server.get("/create-point", (req, res) => {

    // req.query: our url query strings
    //console.log(req.query);

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: our form body
    // Insert data into db
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {
    const search = req.query.search

    if(search == "") {
        //Empty search
    return res.render("search-results.html", { total: 0})
    }


    //grab data from db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        const total = rows.length

    // Show page with db data    
    return res.render("search-results.html", { places: rows, total: total})
    })     

})


// Turn on server - Listen to port 3000
server.listen(3000)