// Add Mongoose
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: 'Namee is Required',
            trim: true
        },
        complete:
        {
            type: Boolean,
            default: false
        },
        priority: Number
    });

//Make this public
module.exports = mongoose.model('Task', taskSchema);