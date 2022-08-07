const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Express
const app = express()

// show requests in console when in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// connect to DB
connectDB()

// Handlebars
app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', '.hbs')

// Sessions (must be above passport middlware)
app.use(session({
    secret: 'keyboard cat',
    resave: false, // dont save a session if nothing is modified
    saveUninitialized: false, // dont create session until something is stored
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))