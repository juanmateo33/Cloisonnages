const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var taskSchema = new Schema({
    operation:{
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        required: true
    }
});

var Tasks = mongoose.model("Task",taskSchema);

module.exports = Tasks;