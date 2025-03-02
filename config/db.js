const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'CrimeTrackDB';

let db;

const connectDB = async () => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };