// .env 
require('dotenv').config()

// async errors
require('express-async-errors')

// db
const connectToDB = require('./db/connect')

const express = require('express')
const app = express()


// routes
const mainRoute = require('./routes/main')

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware json
app.use(express.json())

// .env var
const port = process.env.PORT || 4000
const uri = process.env.URI
const dbName = process.env.DB_NAME

// url 
// const url = `${uri}/${dbName}`


// routes
// app.get('/' , (req,res) => {
//     res.send('<h1>Login/Register</h1>')
// })

app.use('/api/v1', mainRoute)

app.use(notFound)
app.use(errorHandlerMiddleware)

// start app
const startApp = async () => {
    try {
        // connect DB 
        // await connectToDB(url)
        // server
        app.listen(port , () => {
            console.log(`Server listening to ${port}...`);
        })
    } catch (error) {
        console.log("start app error: ", error);
    }
} 

startApp()