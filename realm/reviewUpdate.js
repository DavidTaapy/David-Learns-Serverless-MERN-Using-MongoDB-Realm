exports = async function(payload, response) {
    // If there is review text
    if (payload.body) {
      // Parse review text
      const body =  EJSON.parse(payload.body.text());
      // Get review collection
      const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("reviews");
      // Modification date
      const date = new Date()
    
      // Update Response
      const updateResponse = await reviews.updateOne(
        { user_id: body.user_id, _id: BSON.ObjectId(body.review_id)},
        { $set: { text: body.text, date: date  } },
      )
    
      // Return update status message
      return updateResponse
    }
    
    // If there is no review text
    return  {};
};