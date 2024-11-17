const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Parser } = require('json2csv');

const app = express();
const PORT = 300;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: [''],
    methods: ['POST', 'GET'],
    credentials: true,
  })
);

// Connect to MongoDB
mongoose.connect('mongodb+srv://NARIK19991c:<LLW1eBtA7jlvl9g2>@lablehuman.uni8x.mongodb.net/humandata?retryWrites=true&w=majority&appName=LABLEHUMAN')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Schema for interaction data
const interactionSchema = new mongoose.Schema({
  avgCursorSpeed: Number,
  cursorAcceleration: Number,
  pathDeviation: Number,
  idleTime: Number,
  jitter: Number,
  clickPattern: Number,
  typingSpeed: Number,
  keyPressDuration: Number,
  keyTransitionTime: Number,
  keyHoldTime: Number,
  errorRate: Number,
  sessionDuration: Number,
  pageNavigationPattern: Array,
  averageDwellTime: Number,
  scrollBehavior: Number,
  timestamp: { type: Date, default: Date.now }
});

const Interaction = mongoose.model('Interaction', interactionSchema);

// Route to save interaction data
app.post('/save-data', async (req, res) => {
  try {
    const interaction = new Interaction(req.body);
    await interaction.save();
    res.status(201).send('Data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

// Route to export data as CSV
app.get('/export-csv', async (req, res) => {
  try {
    const interactions = await Interaction.find().lean();
    const fields = Object.keys(interactions[0] || {});
    const parser = new Parser({ fields });
    const csv = parser.parse(interactions);
    res.header('Content-Type', 'text/csv');
    res.attachment('interaction_data.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).send('Error exporting CSV');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
