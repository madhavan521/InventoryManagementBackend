const express = require("express")
const adminauthrouter = express.Router()
const{ signup ,login ,logout, getMe, forget }= require("../Controller/AdminAuthenticationController")
const ProtectRouter = require("../Middleware/ProtectRouter")

adminauthrouter.post('/signup', signup)
adminauthrouter.post('/login', login)
adminauthrouter.post('/logout', logout)
adminauthrouter.get('/me',ProtectRouter , getMe)
adminauthrouter.put('/forget' ,forget)

module.exports = adminauthrouter