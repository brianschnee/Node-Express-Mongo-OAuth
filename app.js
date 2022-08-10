const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Express
const app = express()

// Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

// show requests in console when in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// connect to DB
connectDB()

// Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select
    }
}))
app.set('view engine', '.hbs')

// Express Sessions (must be above passport middlware)
app.use(session({
    secret: 'keyboard cat',
    resave: false, // dont save a session if nothing is modified
    saveUninitialized: false, // dont create session until something is stored
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global variable for Express
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))