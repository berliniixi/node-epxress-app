require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const connectToDB = require('./db/connect')

const notFound = require('./middleware/not-found')

const taskRoute = require('./routes/tasks')

// Connection URI
const uri = process.env.URI; // Use the environment variable for the MongoDB URI
const dbName = process.env.DB_NAME; // Use the environment variable for the MongoDB DB_NAME

// middleware
app.use(express.json())

// Allow requests only from this origin
app.use(cors({
    origin: process.env.ORIGIN,
    // allowedHeaders: ['Content-Type', 'Authorization']
  }));

// port
const port = process.env.PORT || 4000

// routes
app.use('/api/v1/tasks', taskRoute)

// app.get('/api/vi/tasks')  - get all the task
// app.post('/api/vi/tasks')  - create a new task
// app.get('/api/vi/tasks/:id')  - get single task
// app.patch('/api/vi/tasks/:id')  - update task
// app.delete('/api/vi/tasks/:id')  - delete task


app.use(notFound)

const startApp = async () => {
    try {
        await connectToDB(`${uri}/${dbName}`)
        app.listen(port , () => {
            console.log(`Server listening to ${port}...`);
        })

    } catch (error) {
        console.log("start app error: ", error);
    }
}

startApp()