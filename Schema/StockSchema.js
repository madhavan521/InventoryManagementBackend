const mongoose  = require("mongoose")
const stockschema  = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    vendor:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["Low","Medium","High"]
    }

})

const stockhistory = mongoose.Schema({
    stockHistory:[{
        type:Object
    }]
})

const History = mongoose.model("History" , stockhistory)
const Stock = mongoose.model("Stock" , stockschema)
module.exports ={ Stock ,History}