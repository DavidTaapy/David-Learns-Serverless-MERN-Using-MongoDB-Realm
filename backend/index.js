import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

// Configure Dotenv - Load in Environment Variables
dotenv.config()

// Get Mongo Client
const MongoClient = mongodb.MongoClient

// Get Port Number
const port = process.env.PORT || 8000

// Attempt to Connect to Database
MongoClient.connect(                                    // Attempt to connect to MongoDB Client
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {                                         // If There Was An Error Connecting To MongoDB Client
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {                                 // Successfully Connected To MongoDB Client
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`Listening on Port ${port}!`)
    })
})