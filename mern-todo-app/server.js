const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/todos', require('./routes/todoRoutes'));

// Default route to handle "Cannot GET" for undefined routes
app.get('/', (req, res) => {
  res.send('Welcome to the Todo App API');
});

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
