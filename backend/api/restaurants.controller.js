import RestaurantsDAO from "../dao/restaurantsDAO.js"

// Export only this class from the file
export default class RestaurantsController {
  // API for getting restaurants
  static async apiGetRestaurants(req, res, next) {
    // Get variables from URL
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20   // Check URL For Param
    const page = req.query.page ? parseInt(req.query.page, 10) : 0                                              // Check URL For Param

    // Set filters based on url
    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    // Use RestaurantsDAO to get restaurants that fit the criteria
    const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
      filters,
      page,
      restaurantsPerPage,
    })

    // Format the response
    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    }

    // Return response
    res.json(response)
  }

  // API for getting restaurant by ID
  static async apiGetRestaurantById(req, res, next) {
    try {
      let id = req.params.id || {}    // Params is the information in the url after the slash of the standard url
      let restaurant = await RestaurantsDAO.getRestaurantByID(id)
      if (!restaurant) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(restaurant)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  // API for getting restaurant cuisines
  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}