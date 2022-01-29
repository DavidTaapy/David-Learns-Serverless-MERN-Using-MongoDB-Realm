import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

// Initialise Express App
const app = express()

// Apply Middleware
app.use(cors())                     // Use CORS
app.use(express.json())             // Body Parser in Older Versions - To Accept JSON in Requests

// Creating Routes
app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => {
    res.status(404).json({
        error: "Not found!"
    })
})  // Wildcard Route - Not in Route File

// Export one object, which is app, in this file
export default app