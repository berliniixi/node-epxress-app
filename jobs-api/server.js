require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// connect configuration  
const connectToDB = require('./db/connect');
const uri = process.env.URI
const db_name = process.env.DB_NAME
const url = `${uri}/${db_name}`

// routes imports 
const authRoute = require("./routes/auth")
const jobsRoute = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/jobs',jobsRoute)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToDB(url)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();