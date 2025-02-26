const mongoose = require("mongoose")

const DatabaseConnection=()=>{
mongoose.connect("mongodb://localhost:27017/project2")
.then(()=>{
    console.log("Database Connected Sucessfully ")
})    
.catch((err)=>{
    console.log(err)
})
}
module.exports= DatabaseConnection;
