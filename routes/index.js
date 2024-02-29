const express = require('express');
const Task = require('../models/task');

const router = express.Router();

router.get('/tasks', (req, res) => {
    Task.all((err, tasks) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(tasks);
    });
});

router.post('/tasks', (req, res) => {
    const newTask = req.body;
    Task.create(newTask, (err, task) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(task);
    });
});

router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    Task.update(id, updatedTask, (err, task) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(task);
    });
});

router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    Task.delete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

module.exports = router;
