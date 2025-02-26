const mongoose = require("mongoose");  

const foodProductSchema = mongoose.Schema({  
    name: {  
        type: String,  
        required: true  
    },  
    image: {  
        data: Buffer,          
        contentType: String    
    }, 
    description:{
        type:String,
    },
    category:{
       type:String
    },
    cuisine:{
        type:String
    },
    price: {  
        type: String,  
        required: true  
    } ,
    Incrediantdata:[
        {
            type:Object
        }
    ]
}); 
const foodincrediantschema = mongoose.Schema({
    incrediantname:{
        type:String
    },
    incrediantquantity:{
        type:String
    }
}) 
const Incrediant = mongoose.model("Incrediant",foodincrediantschema)
const Food = mongoose.model("Food", foodProductSchema);  
module.exports = {Food , Incrediant};