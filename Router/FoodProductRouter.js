const express = require("express");  
const multer = require('multer');  
const foodrouter = express.Router();  
const ProtectRouter = require('../Middleware/ProtectRouter'); 
const { createfood, createfoodincrediant, getfood, updatefood, deletefood, updatefoodincrediant, deletefoodincrediant, getfoodbyid } = require("../Controller/FoodProductController");  

const storage = multer.memoryStorage();  
const upload = multer({ storage: storage });  

foodrouter.post('/create', ProtectRouter, upload.single('image'), createfood);  
foodrouter.post('/incre/create/:id' ,ProtectRouter,createfoodincrediant)
foodrouter.get('/get',ProtectRouter,getfood)
foodrouter.get('/get/:id',ProtectRouter,getfoodbyid)
foodrouter.put('/update/:id' ,ProtectRouter,updatefood)
foodrouter.delete('/delete/:id',ProtectRouter,deletefood)
foodrouter.put('/incre/update/:id' ,ProtectRouter,updatefoodincrediant)
foodrouter.delete('/incre/delete/:id',ProtectRouter,deletefoodincrediant)

module.exports = foodrouter;