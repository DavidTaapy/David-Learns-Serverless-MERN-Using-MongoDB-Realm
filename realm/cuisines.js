exports = async function(payload, response) {
    // Get database from Mongodb Atlas
    const collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
    // Get unique cusines in collection
    const cuisines = await collection.distinct("cuisine");
    
    // Return cuisines
    return cuisines;
};