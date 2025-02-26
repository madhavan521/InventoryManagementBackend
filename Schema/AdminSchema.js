const mongoose = require("mongoose")


const adminschema = mongoose.Schema({
    username: {  
        type: String,  
        required: "true"  
    },  
    fullname: {  
        type: String,  
        required: "true"  
    },  
    email: {  
        type: String,  
        required: "true"  
    },  
    password: {  
        type: String,  
        required: "true"  
    }
})

const Admin = mongoose.model("Admin" ,adminschema)


module.exports = Admin