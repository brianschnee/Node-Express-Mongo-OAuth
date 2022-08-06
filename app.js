const express = require('express')
const app = express()
const dotenv = require('dotenv')

// load config
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))