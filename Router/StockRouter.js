const express= require("express")
const stockrouter = express.Router()
const ProtectRouter = require("../Middleware/ProtectRouter")
const { createstock ,getstock, updatestock, deletestock, createstockhistory, getstockhistory, deletestockhistory, getstockbyid } = require("../Controller/StockController")


stockrouter.post('/create' ,ProtectRouter, createstock)
stockrouter.get('/get' , ProtectRouter , getstock)
stockrouter.get('/get/:id' , ProtectRouter , getstockbyid)
stockrouter.put('/update/:id' ,ProtectRouter ,updatestock)
stockrouter.delete('/delete/:id' ,ProtectRouter ,deletestock)
stockrouter.post('/history/create' ,ProtectRouter, createstockhistory)
stockrouter.get('/history/get' , ProtectRouter , getstockhistory)
stockrouter.delete('/history/delete/:id' ,ProtectRouter ,deletestockhistory)


module.exports = stockrouter
