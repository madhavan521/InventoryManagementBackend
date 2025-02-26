
const http = require("http")
const express=require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT
//modules
const managerauthrouter = require("./Router/ManagerAuthenticationRouter")
const DatabaseConnection = require("./Database/DatabaseConnection")
const adminauthrouter = require("./Router/AdminAuthenticationRouter")
const staffauthrouter =require('./Router/StaffAuthenticationRouter')
const stockrouter = require('./Router/StockRouter')
const vendorrouter = require("./Router/VendorRouter")
const foodrouter = require("./Router/FoodProductRouter")


//MiddleWare
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true  
  }));
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));

// Routers 
app.use('/api/auth/manager' , managerauthrouter)
app.use('/api/auth/admin' , adminauthrouter)
app.use('/api/auth/staff' , staffauthrouter)
app.use('/api/stock' , stockrouter)
app.use('/api/vendor' ,vendorrouter)
app.use('/api/food',foodrouter)
 


// Database Connection

DatabaseConnection();

// Server Connection

const server = http.createServer(app)
server.listen(PORT ,()=>{
    console.log("Sever started listing")
})
