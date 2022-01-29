import ReviewsDAO from "../dao/reviewsDAO.js"

// Export only this class for this file
export default class ReviewsController {
    // API for Posting Review
    static async apiPostReview(req, res, next) {
        try {
            // Get parameters from post request
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            // Add review using ReviewsDAO's method
            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date
            )

            // Return success if it worked
            res.json({
                status: "Success"
            })
        } catch (e) {                               // If something above failed
            res.status(500).json({
                error: e.message
            })
        }
    }

    // API for Updating Review
    static async apiUpdateReview(req, res, next) {
        try {
            // Setting variables
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const text = req.body.text
            const date = new Date()

            // Update review using ReviewDAO's method
            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                userId,
                text,
                date
            )
            
            // Checking for errors
            var { error } = ReviewResponse
            if (error) {
                res.status(400).json({
                    error
                })
            }

            // If nothing was changed, throw error
            if (ReviewResponse.modifiedCount == 0) {
                throw new Error("Unable to update review - User may not be original poster!")
            }

            // Return success if it worked
            res.json({
                status: "Success"
            })
        } catch (e) {                               // If something above failed
            res.status(500).json({
                error: e.message
            })
        }
    }

    // API for Deleting Review
    static async apiDeleteReview(req, res, next) {
        try {
            // Setting variables
            const reviewId = req.query.id
            const userId = req.body.user_id         // Different from how it would be done in a production setting - No body for delete requests
            console.log(reviewId)
            
            // Delete review using ReviewDAO's method
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            )

            // Return success if it worked
            res.json({
                status: "Success"
            })
        } catch (e) {                               // If something above failed
            res.status(500).json({
                error: e.message
            })
        }
    }
}