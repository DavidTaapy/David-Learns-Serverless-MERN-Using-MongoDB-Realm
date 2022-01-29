import mongodb from "mongodb"

// Setting variables
const ObjectId = mongodb.ObjectId
let reviews

// Only export this class from this file
export default class ReviewsDAO {
    // Method to inject the server with reviews from the database
    static async injectDB(conn) {
        // If reviews is already populated
        if (reviews) {
            return
        }
        try {
            // Get reviews from database
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    // Method to add review
    static async addReview(restaurantId, user, review, date) {
        try {
            // Create the review document using the given parameters
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId)
            }
            // Insert the above review document
            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    // Method to update review
    static async updateReview(reviewId, userId, text, date) {
        try {
        // Update review
        const updateResponse = await reviews.updateOne(
            // Find documents matching the filter
            {
                user_id: userId,
                _id: ObjectId(reviewId)
            },
            // Change the above document that matched
            { $set:
                {
                text: text,
                date: date
                }
            }
        )
        // Return updateResponse
        return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    // Method to delete review
    static async deleteReview(reviewId, userId) {
        try {
            // Delete a document matching the filter
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            })
            // Return deleteResponse
            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }
}