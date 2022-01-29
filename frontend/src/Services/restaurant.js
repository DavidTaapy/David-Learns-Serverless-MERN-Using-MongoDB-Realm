import http from "../http-common";

// Get the url by adding above the base url in http
class RestaurantDataService {
    // Get all restaurants
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    // Get restaurant by ID
    get(id) {
        return http.get(`/id/${id}`);
    }

    // Find restaurant by conditions - Either by name, zipcode or cuisine
    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    } 

    // Create review
    createReview(data) {
        return http.post("/review", data);
    }

    // Update review
    updateReview(data) {
        return http.put("/review", data);
    }

    // Delete review
    deleteReview(id, userId) {
        return http.delete(`/review?id=${id}`, {data: {user_id: userId}});
    }
    
    // Get cuisines in database
    getCuisines(id) {
        return http.get(`/cuisines`);
    }
}

export default new RestaurantDataService();