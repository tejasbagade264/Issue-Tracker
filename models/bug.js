const mongoose = require("mongoose");
const User = require('./user');
const Project = require('./project');


const bugSchema = new mongoose.Schema({
    bug: {
        type: String,
        required: true
    },
    description: {
        type: String
      },
      asignee: {
        type: String,
        required: true
     },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
     },
     project:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
     }, 
   dueDate: {
    type: Date,
 }
}, {
    timestamps: true
});



const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;
