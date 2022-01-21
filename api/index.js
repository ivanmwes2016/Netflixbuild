const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('../api/routes/auth')
const userRoute = require('../api/routes/users')
const movieRoute = require('../api/routes/movies')
const listRoute = require('../api/routes/lists')


dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log("DB Connection successful"))

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/lists", listRoute)

app.listen(4000, () => {
    console.log("Backend server is running")
})