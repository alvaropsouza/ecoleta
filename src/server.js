const express = require("express")  
const server = express()

// Config 'public' folder, so the server can reach its children folders > assets, styles and scripts
server.use(express.static("public"))

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
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})


// Turn on server - Listen to port 3000
server.listen(3000) 