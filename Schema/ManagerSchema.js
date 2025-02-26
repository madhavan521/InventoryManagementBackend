const mongoose = require("mongoose")


const managerschema = mongoose.Schema({
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

const Manager = mongoose.model("Manager" ,managerschema)


module.exports = Manager