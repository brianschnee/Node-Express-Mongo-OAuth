const express = require('express')
const app = express()

// show requests in console when in development mode
const morgan = require('morgan')
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// load config
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

// connect to DB
const connectDB = require('./config/db')
connectDB()

// use express handlebars template engine
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', '.hbs')

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))