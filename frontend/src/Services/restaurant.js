import http from "../http-common";

// Get the url by adding above the base url in http
class RestaurantDataService {
    // Get all restaurants
    getAll(page = 0) {
        return http.get(`restaurants?page=${page}`);
    }

    // Get restaurant by ID
    get(id) {
        return http.get(`/restaurant?id=${id}`);
    }

    // Find restaurant by conditions - Either by name, zipcode or cuisine
    find(query, by = "name", page = 0) {
        return http.get(`restaurants?${by}=${query}&page=${page}`);
    } 

    // Create review
    createReview(data) {
        return http.post("/reviewNew", data);
    }

    // Update review
    updateReview(data) {
        return http.put("/reviewUpdate", data);
    }

    // Delete review
    deleteReview(id, userId) {
        return http.delete(`/reviewDelete?id=${id}`, {data: {user_id: userId}});
    }
    
    // Get cuisines in database
    getCuisines(id) {
        return http.get(`/cuisines`);
    }
}

export default new RestaurantDataService();