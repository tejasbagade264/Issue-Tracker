const express=require("express");
const router=express.Router();
  

const homeController = require('../controllers/home_controller');


router.get('/new_project', (req, res) => {
    res.render('new_project');
});
router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/project', require('./project'));


module.exports=router;

