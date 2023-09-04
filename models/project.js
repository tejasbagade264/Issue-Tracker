const mongoose = require("mongoose");
const User = require('./user');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
     },
    asignee: {
      type: String,
      required: true
   }
}, {
    timestamps: true
});



const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
