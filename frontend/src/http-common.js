import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:5000/api/v1/restaurants/", // Base URL for Backend
    baseURL: "https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurant-app-ifhpu/service/restaurants/incoming_webhook/",
    // baseURL: "https://ap-southeast-1.aws.data.mongodb-api.com/app/restaurant-app-ifhpu/endpoint/", // Base URL for Backend Server - Using HTTPS Endpoints
    headers: {
        "Content-type": "application/json"
    }
});