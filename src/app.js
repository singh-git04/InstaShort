const express = require("express")
const authRoute = require("../src/routes/auth.routes")
const cookieParser = require("cookie-parser")

/* Express server */
const app = express()



/* Middleware */
app.use(express.json())
app.use(cookieParser())



/* AuthRoutes */
app.use("/api/auth",authRoute)

module.exports = app