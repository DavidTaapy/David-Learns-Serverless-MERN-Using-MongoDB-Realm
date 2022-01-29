import mongodb from "mongodb"

// Initialise variables
const ObjectId = mongodb.ObjectId
let restaurants

// Export this class from the file
export default class RestaurantsDAO {
    // Inject database with documents from restaurants collection in the sample_restaurants database
    static async injectDB(conn) {
        if (restaurants) {
        return
        }
        try {
        restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
        console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`,)
        }
    }

    // Method to get restaurants based on 
    static async getRestaurants({
        // Default Parameters
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query
        // Setting up query based on filters
        if (filters) {
        if ("name" in filters) {
            query = { $text: { $search: filters["name"] } }
        } else if ("cuisine" in filters) {
            query = { "cuisine": { $eq: filters["cuisine"] } }
        } else if ("zipcode" in filters) {
            query = { "address.zipcode": { $eq: filters["zipcode"] } }
        }
        }

        let cursor
        
        // Find restaurants that fit the query
        try {
        cursor = await restaurants.find(query)
        } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        // Skip to a specific page
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
        
        // Return the restaurants found and number of restaurants found
        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(query)
            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }

    // Get restaurant by ID
    static async getRestaurantByID(id) {
        try {
            // Pipeline to get reviews for the specific restaurant
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                    {
                        $lookup: {
                            from: "reviews",
                            let: {
                                id: "$_id",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$restaurant_id", "$$id"],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        date: -1,
                                    },
                                },
                            ],
                            as: "reviews",
                        },
                    },
                    {
                        $addFields: {
                            reviews: "$reviews",
                        },
                    },
                ]
            return await restaurants.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getRestaurantByID: ${e}`)
            throw e
        }
    }

    // Get cuisines in the database
    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        } catch (e) {
            console.error(`Unable to get cuisines, ${e}`)
            return cuisines
        }
    }
}