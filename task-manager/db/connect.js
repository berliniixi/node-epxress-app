const { MongoClient } = require('mongodb');

// Connection URI
const uri = process.env.URI; // Use the environment variable for the MongoDB URI
const dbName = process.env.DB_NAME; // Use the environment variable for the MongoDB DB_NAME

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to MongoDB
const connectToDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
};

module.exports = connectToDB;
