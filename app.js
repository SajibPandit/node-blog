const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

//Import Routes
const authRoutes = require('./routes/authRoute')

//Import Middlewares
const {bindUserWithRequest} = require('./middlewares/authMiddleware')

const store = new MongoDBStore({
    uri:'mongodb://localhost:27017/expessblog',
    collection:'mySessions',
    expires: 1000*60*60*2
})

const app = express()

//Setup View Engine
app.set('view engine','ejs')
app.set('views','views')

//MiddleWare Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended:true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave:false,
        saveUninitialized:false,
        store
    }),
    bindUserWithRequest()
]

app.use(middleware)

app.use('/auth',authRoutes)

app.get('/', (req, res) =>{
    res.json({message:'Hello World'})
})

const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/expessblog',{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connection Established..!')
        app.listen(PORT,()=>{
            console.log(`Server is running on Port ${PORT}..!`)
        })
    })
    .catch(e => console.log(e))