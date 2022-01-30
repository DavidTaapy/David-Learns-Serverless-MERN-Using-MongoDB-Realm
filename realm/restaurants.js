exports = async function(payload, response) {
    // Get parameters
    const {restaurantsPerPage = 20, page = 0} = payload.query;
    
    // Modify query according to the parameters
    let query = {};
    if (payload.query.cuisine) {
      query = { $text: { $search: payload.query.cuisine } }
    } else if (payload.query.zipcode) {
      query = { "address.zipcode": { $eq: payload.query.zipcode } }
    } else if (payload.query.name) {
      query = { $text: { $search: payload.query.name } }
    }
    
    // Get collecetions from Mongodb Atlas
    const collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
    let restaurantsList = await collection.find(query).skip(page*restaurantsPerPage).limit(restaurantsPerPage).toArray()
    
    // Convert ID to string
    restaurantsList.forEach(restaurant => {
      restaurant._id = restaurant._id.toString();
    });
    
    // Return Data's Format
    const responseData = {
      restaurants: restaurantsList,
      page: page.toString(),
      filters: {},
      entries_per_page: restaurantsPerPage.toString(),
      total_results: restaurantsList.length.toString(),
    };
    
    // Return Response Data
    return responseData;
};