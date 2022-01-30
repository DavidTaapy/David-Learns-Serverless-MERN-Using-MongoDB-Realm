exports = async function(payload, response) {
    // If there is review text
    if (payload.body) {
      // Parse review text
      const body =  EJSON.parse(payload.body.text());
      // Get review collection
      const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("reviews");
      
      // Review document format
      const reviewDoc = {
          name: body.name,
          user_id: body.user_id,
          date: new Date(),
          text: body.text,
          restaurant_id: BSON.ObjectId(body.restaurant_id)
      };
      
      // Return status message
      return await reviews.insertOne(reviewDoc);
    }
    
    // If there is no review text
    return  {};
};