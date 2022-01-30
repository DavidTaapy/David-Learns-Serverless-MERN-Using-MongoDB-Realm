import axios from "axios";

export default axios.create({
    baseURL: "https://ap-southeast-1.aws.data.mongodb-api.com/app/restaurant-app-ifhpu/endpoint/",    // Base URL for Backend Server
    headers: {
        "Content-type": "application/json"
    }
});