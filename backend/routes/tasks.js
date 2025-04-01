const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.post('/', auth, async (req, res) => {
    const task = await Task.create({ ...req.body, user: req.user.userId });
    res.json(task);
});

router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
});

router.get('/:id', auth, async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    res.json(task);
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title && !description && !status) {
            return res.status(400).json({ message: "At least one field is required to update." });
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            { title, description, status }, 
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.delete('/:id', auth, async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    res.json({ message: 'Task deleted' });
});

module.exports = router;
