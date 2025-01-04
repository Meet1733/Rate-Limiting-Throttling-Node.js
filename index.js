const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require("cors");

const app = express();
const PORT = process.env.POTR || 3000

const limiter = rateLimit({
    windowMs: 10 * 1000, //How long to remember requests for, in milliseconds. (15 min here)
    limit: 5, //How many requests to allow.
    message: "Too many request from this IP, please try after sometime" //Response to return after limit is reached.
})

// app.use(cors)
app.use(limiter, cors())

app.get('/', (req, res) => {
    res.json({ data: "Hello" })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})