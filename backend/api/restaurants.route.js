import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

// Express Router
const router = express.Router()

// Setting up the default route
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

// Setting up the route for a restaurant by ID
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)

// Setting up the route for restaurants by cuisine
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

// Setting up the route for reviews
router.route("/review")
    .post(ReviewsCtrl.apiPostReview)            // For handling post request
    .put(ReviewsCtrl.apiUpdateReview)           // For handling update request
    .delete(ReviewsCtrl.apiDeleteReview)        // For handling delete request

// Test Function for Route
// router.route("/").get((req, res) => res.send("Hello world!"))

// Router as Only Export
export default router