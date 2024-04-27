const express = require('express')
const app = express()

const taskRoute = require('./routes/tasks')

// middleware
app.use(express.json())


// port
const port = 3000

// routes
app.use('/api/v1/tasks', taskRoute)

// app.get('/api/vi/tasks')  - get all the task
// app.post('/api/vi/tasks')  - create a new task
// app.get('/api/vi/tasks/:id')  - get single task
// app.patch('/api/vi/tasks/:id')  - update task
// app.delete('/api/vi/tasks/:id')  - delete task


app.listen(port , () => {
    console.log(`Server listening to ${port}...`);
})