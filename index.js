// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rarmenta:t3mdgqSH49xZx35w@itmd-444-back-end-dev.twepymw.mongodb.net/?retryWrites=true&w=majority&appName=ITMD-444-Back-End-Dev', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
const taskRoutes = require('./routes/routes');
app.use('/tasks', taskRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
