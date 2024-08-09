const express = require('express');
const path = require('path')

const app = express();
// import routers here
const indexRouter = require('./routes/index')


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }))
const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))

// use routers here
app.use("/", indexRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`always watchin you on ${PORT}`))