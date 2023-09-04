const express = require('express');
const router = express.Router();
const passport = require('passport');

const projectController=require('../controllers/project_controller');





router.get('/delete/:id', projectController.delete);
router.get('/details/:projectId', projectController.projectdetails);
router.get('/bugPage/:projectId', projectController.bugPage);

router.post('/create', projectController.create);
router.post('/createBug/:projectId', projectController.createBug);



module.exports=router;