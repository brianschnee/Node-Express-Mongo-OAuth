const express = require('express')
const app = express()

// load config
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

// connect to DB
const connectDB = require('./config/db')
connectDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))