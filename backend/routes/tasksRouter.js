const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const Tasks = require('../models/tasks');
const { validateBody, schema, schema2 } = require('../models/JSONvalidators/taskvalidator');

const taskRouter = express.Router();

taskRouter.use(bodyParser.json());

taskRouter.route('/')
//Get all tasks
.get( (req,res,next) => {
    Tasks.find(req.query)
    .then((tasks) => {
        res.send(tasks);
    })
    .catch((err) => next(err));
})

//Post a task (validatebody)
.post(authenticate.verifyUser, validateBody(schema),(req,res,next) => {
    Tasks.create(req.body)
    .then((task) => {
        console.log('Task Created',task);
        res.send(task);
    })
    .catch((err) => next(err));
})


//Delete all tasks
.delete(authenticate.verifyUser, (req,res,next) => {
    Tasks.remove({})
    .then((resp) => {
        res.send(resp);
    })
    .catch((err) => next(err));
});

//Get a specific task
taskRouter.route('/:taskId')
.get(authenticate.verifyUser, (req,res,next) => {
    Tasks.findById(req.params.taskId)
    .then((task) => {
        res.send(task);
    })
    .catch((err) => next(err));
})


//Modify a specific tasks ( add JSON Validators)
.patch(validateBody(schema2),(req, res, next) => {
    Tasks.findByIdAndUpdate(req.params.taskId, {
        $set: {done:req.body.done}
    }, { new: true })
    .then((task) => {
        res.send(task);
    })
    .catch((err) => next(err));
})


//delete a specific task ( voir si not found erreur)
.delete(authenticate.verifyUser, (req,res,next) => {
    Tasks.findByIdAndRemove(req.params.taskId)
    .then((resp) => {
        res.send(resp);
    })
    .catch((err) => next(err));
});

module.exports = taskRouter;