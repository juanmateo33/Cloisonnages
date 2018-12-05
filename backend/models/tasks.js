const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var taskSchema = new Schema({
    operation:{
        type: {String, enum: ['Cloisonner', 'Décloisonner']},
        required: true,
    },
    room: {
        type: {String, enum: ['Auditorium 1-2 Michelin, Eiffel', 'e.191 - e.192, Bouygues', 'EA.07 - EA.08, Eiffel', 'EE.004 - EE.005, Eiffel','h.201 - h.202, Bouygues', 'h.207 - h.208, Bouygues', 'h.213 - h.214, Bouygues', 'sa.104 - sa-108, Bouygues', 'sc.007 - sc.013, Bouygues', 'sd.101 - sd.103, Bouygues', 'sd.102 - sd.104, Bouygues', 'sd.201 - sd.203, Bouygues']},
        required: true
    },
    beginning: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    }

});

var Tasks = mongoose.model("Task",taskSchema);

module.exports = Tasks;