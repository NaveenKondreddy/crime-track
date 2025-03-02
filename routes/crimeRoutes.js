const express = require('express');
const router = express.Router();
const Crime = require('../models/crimeModel');

// Create a new crime report
router.post('/', async (req, res) => {
  const crimeData = req.body;
  try {
    const result = await Crime.create(crimeData);
    res.status(201).json({ message: 'Crime reported', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to report crime' });
  }
});

// Get all crime reports
router.get('/', async (req, res) => {
  try {
    const crimes = await Crime.find();
    res.json(crimes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crimes' });
  }
});

module.exports = router;