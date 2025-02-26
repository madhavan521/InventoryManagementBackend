const express= require("express")
const vendorrouter = express.Router()
const ProtectRouter = require("../Middleware/ProtectRouter")
const { createvendor ,getvendor, updatevendor, deletevendor, createvendorproduct, getproducts, updatevendorproduct, individualvendor, deleteVendorProduct } = require("../Controller/VendorController")


vendorrouter.post('/create' ,ProtectRouter, createvendor)
vendorrouter.get('/get' , ProtectRouter , getvendor)
vendorrouter.put('/update/:id' ,ProtectRouter ,updatevendor)
vendorrouter.delete('/delete/:id' ,ProtectRouter ,deletevendor)
vendorrouter.post('/product/create' ,ProtectRouter, createvendorproduct)
vendorrouter.put('/product/update/:id' ,ProtectRouter ,updatevendorproduct)
vendorrouter.get('/product/get/:id' , ProtectRouter , getproducts)
vendorrouter.get('/:id',ProtectRouter,individualvendor)
vendorrouter.delete('/product/delete/:id' ,ProtectRouter ,deleteVendorProduct)


module.exports = vendorrouter
