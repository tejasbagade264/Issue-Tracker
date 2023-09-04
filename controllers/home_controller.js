const express = require('express');
const router=express.Router();
const Project= require('../models/project');
const User = require('../models/user');

module.exports.home = async(req, res) => {

  try{

    let projects = await Project.find({}).populate('user').sort({ createdAt: -1 });
    //  if(!project){
    //      console.log('None');
    //      //add something when none projects are created
    //  }
     
     return res.render('home',{
            projects:projects,
            
     })

  }catch (error) {
    console.log(error, 'Error - projects not retrieved');
    return res.status(500).send('Internal Server Error');
}
}




   
