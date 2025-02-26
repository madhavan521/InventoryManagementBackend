const mongoose = require("mongoose")

const DatabaseConnection=()=>{
mongoose.connect("mongodb+srv://madhavan521:madhavan@cluster0.5ygav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Database Connected Sucessfully ")
})    
.catch((err)=>{
    console.log(err)
})
}
module.exports= DatabaseConnection;
