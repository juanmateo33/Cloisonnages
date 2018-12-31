const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const Tasks = require('../models/tasks');
const { validateBody, validateQuery, schemaAll, schemaDone, schemaDate } = require('../models/JSONvalidators/taskvalidator');

const taskRouter = express.Router();

taskRouter.use(bodyParser.json());

taskRouter.route('/')
//Get all tasks to complete between two Dates
.get(authenticate.verifyUser, validateQuery(schemaDate), (req,res,next) => {
    //create the query according to req.query
    if (!req.query.since && !req.query.until) {query={};} 
    else {
        query = {end:{}};
        if (req.query.since){
            since = new Date(req.query.since);
            query.end['$gte'] = since;
      } if (req.query.until){
            until = new Date(req.query.until);
            query.end['$lte'] = until;
      }
    }
    
    Tasks.find(query)
    .then((tasks) => {
        res.status(200).send(tasks); //operation successful
    })
    .catch((err) => next(err));
})


//Post a task 
.post(authenticate.verifyUser, validateBody(schemaAll), (req,res,next) => {
    Tasks.create(req.body)
    .then((task) => {
        console.log('Task Created',task);
        res.status(201).send(task); // created
    })
    .catch((err) => next(err));
})


//Delete all tasks between two Dates (not used right now)
.delete(authenticate.verifyUser, validateQuery(schemaDate), (req,res,next) => {
    if (!req.query.since && !req.query.until) {query={};} 
    else {
        query = {end:{}};
        if (req.query.since){
            since = new Date(req.query.since);
            query.end['$gte'] = since;
      } if (req.query.until){
            until = new Date(req.query.until);
            query.end['$lte'] = until;
      }
    }
    Tasks.deleteMany(query)
    .then((resp) => {
        res.status(204).send(); // no return
    })
    .catch((err) => next(err));
});



//Get a specific task
taskRouter.route('/:taskId')
.get(authenticate.verifyUser, (req,res,next) => {
    Tasks.findById(req.params.taskId)
    .then((task) => {
        if(!task){
            res.status(404).send('TaskID Not Found') // Not Found
        } else {res.status(200).send(task);} //Success
    })
    .catch((err) => next(err));
})


//Modify a specific task
.patch(authenticate.verifyUser, validateBody(schemaDone),(req, res, next) => {
    Tasks.findByIdAndUpdate(req.params.taskId, {
        $set: {done:req.body.done}
    }, { new: true })
    .then((task) => {
        if (!task){
            res.status(404).send('TaskID Not Found');
        }
        else{
            res.status(200).send(task);}
    })
    .catch((err) => next(err));
})


//delete a specific task
.delete(authenticate.verifyUser, (req,res,next) => {
    Tasks.findByIdAndRemove(req.params.taskId)
    .then(() => {
        if (!task){
            res.status(404).send('TaskID Not Found');
        }
        else{
            res.status(204)}
    })
    .catch((err) => next(err));
});

module.exports = taskRouter;