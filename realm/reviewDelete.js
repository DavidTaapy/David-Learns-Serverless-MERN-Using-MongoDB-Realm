exports = async function(payload, response) {
    // Get review database
    const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("reviews");
    // Delete review that matches ID
    const deleteResponse = await reviews.deleteOne({
      _id: BSON.ObjectId(payload.query.id)
    })
  
    // Return delete status message
    return deleteResponse
};