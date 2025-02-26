const express = require("express")
const managerauthrouter = express.Router()
const{ signup ,login ,logout, getMe, forget }= require("../Controller/ManagerAuthenticationController")
const ProtectRouter = require("../Middleware/ProtectRouter")

managerauthrouter.post('/signup', signup)
managerauthrouter.post('/login', login)
managerauthrouter.post('/logout', logout)
managerauthrouter.get('/me',ProtectRouter , getMe)
managerauthrouter.put('/forget' ,forget)

module.exports = managerauthrouter