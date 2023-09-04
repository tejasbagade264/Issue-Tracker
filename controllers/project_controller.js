const express = require('express');
const router=express.Router();
const Project = require('../models/project');
const Bug = require('../models/bug');
const User = require('../models/user');



module.exports.create = async function(req, res){

   try{
   // const userObjectId = // Assuming req.user contains user information after authentication
      
    // Set the user ObjectId in the request body
    req.body.user = req.user._id; 
          
    let project = await Project.create(req.body);
    if(!project){
        console.log('error in creating the project')
    }
    console.log('Created project details:', project);
    req.flash('success', 'Project Created');
    return res.redirect('/');
   }catch(error){
       console.log(error, 'error- project isnt created');
       return res.redirect('/');
   }
}

// module.exports.displayproject=async function(req, res){

//     try{
//      let project = await Project.find().sort({ createdAt: -1 });
//     //  if(!project){
//     //      console.log('None');
//     //      //add something when none projects are created
//     //  }
     
//      return res.render('home',{
//             project:Project
//      })
//     } catch (error) {
//         console.log(error, 'Error - projects not retrieved');
//         return res.redirect('/');
//     }
//  }


module.exports.delete = async function(req, res){
    try {
      
        
        const project = await Project.findById(req.params.id)
        console.log('project to be deleted:', project);
         
        if(project){
            console.log('project found');
            await project.deleteOne();
            req.flash('success', 'Project Deleted');
            return res.redirect('back');
        }else{
            return res.redirect('back'); 
        }
    } catch (err) {
        console.error('Error:', err);
        return res.redirect('back');
    }
}


module.exports.projectdetails = async function(req, res) {
    try {
        // Ensure that req.params.projectId is a valid ObjectId
        const project = await Project.findById(req.params.projectId).populate('user');
        console.log('project found:', project);
        if (!project) {
            // Handle the case where the project is not found
            return res.status(404).send('Project not found');
        }

        const bugs = await Bug.find({ project: req.params.projectId }).populate('user');

        // Render the project details page with the project and bugs data
        res.render('project_details', { project: project, bugs: bugs });
        
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}


module.exports.bugPage = async function(req, res){
    // Retrieve the projectId from the URL
    const projectId = req.params.projectId;
    console.log('fetched when i click on crrate bug',projectId)
    try {
        // You can use projectId to fetch project-specific data if needed

        // Render the bugPage view with the projectId
        res.render('bugPage', { projectId: projectId });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}



module.exports.createBug = async function(req, res){
    try {
        const projectIdd = req.params.projectId; // Use the correct parameter name
        console.log('fetched project id when i create a bug', projectIdd);

        // Include the user's ID and project ID in the bug document
        req.body.user = req.user._id;
        req.body.project = projectIdd;

        let bug = await Bug.create(req.body);
        if (!bug) {
            console.log('error in creating the bug');
        }
        console.log('Bug details:', bug);
        req.flash('success', 'Bug Created');
        return res.redirect('/project/details/'+ projectIdd);
    } catch (error) {
        console.log(error, 'error- bug isnt created');
        return res.render('/');
    }
}



