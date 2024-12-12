const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a Todo
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTodo = new Todo({ title, description, status });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Retrieve all Todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a specific Todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title, description, status }, { new: true });
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Todo
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
