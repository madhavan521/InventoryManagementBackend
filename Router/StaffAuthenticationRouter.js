const express = require("express")
const staffauthrouter = express.Router()
const{ signup ,login ,logout, getMe, forget }= require("../Controller/StaffAuthenticationController")
const ProtectRouter = require("../Middleware/ProtectRouter")

staffauthrouter.post('/signup', signup)
staffauthrouter.post('/login', login)
staffauthrouter.post('/logout', logout)
staffauthrouter.get('/me',ProtectRouter , getMe)
staffauthrouter.put('/forget' ,forget)

module.exports = staffauthrouter