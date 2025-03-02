const { getDB } = require('../config/db');

const crimeSchema = {
  title: String,
  description: String,
  location: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Reported' }
};

const Crime = {
  create: async (crimeData) => {
    const db = getDB();
    const result = await db.collection('crimes').insertOne(crimeData);
    return result;
  },
  find: async () => {
    const db = getDB();
    return await db.collection('crimes').find().toArray();
  }
};

module.exports = Crime;