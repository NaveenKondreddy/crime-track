const express = require('express');
const { connectDB } = require('./config/db');
const crimeRoutes = require('./routes/crimeRoutes');
const app = express();

app.use(express.json());
app.use('/api/crimes', crimeRoutes);
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

