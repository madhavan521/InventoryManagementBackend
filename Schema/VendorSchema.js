const mongoose  = require("mongoose")

 const vendorproductSchma = mongoose.Schema({
    vendorProduct:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
 })

const vendorschema  = mongoose.Schema({
    vendorName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:String,
        required:true
    },
   location:{
        type:String,
        required:true
    },
    Products :[{
        type:Object
    } ]
})

const Vendor = mongoose.model("Vendor" , vendorschema)
const VendorProduct = mongoose.model("VendorProduct" ,vendorproductSchma)
module.exports = {Vendor ,VendorProduct}