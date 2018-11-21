const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Tasks = require('../models/tasks');

const taskRouter = express.Router();

taskRouter.use(bodyParser.json());

taskRouter.route('/')
.get((req,res,next) => {
    Tasks.find({})
    .then((tasks) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(tasks);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Tasks.create(req.body)
    .then((task) => {
        console.log('Task Created',task);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(task);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tasks');
})
.delete((req,res,next) => {
    Tasks.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

taskRouter.route('/:taskId')
.get((req,res,next) => {
    Tasks.findById(req.params.taskId)
    .then((task) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(task);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /tasks/' + req.params.taskId);
})
.put((req, res, next) => {
    Tasks.findByIdAndUpdate(req.params.taskId, {
        $set: req.body
    }, { new: true })
    .then((task) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(task);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {
    Tasks.findByIdAndRemove(req.params.taskId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = taskRouter;