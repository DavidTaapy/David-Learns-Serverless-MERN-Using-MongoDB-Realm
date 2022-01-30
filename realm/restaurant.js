exports = async function(payload, response) {
    // Get parameter ID
    const id = payload.query.id || ""
    // Get database from Mongodb Atlas
    const restaurants = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
    
    // Get reviews for the restaurants
    const pipeline = [
      {
          $match: {
              _id: BSON.ObjectId(id),
          },
      },
            {
                $lookup: {
                    from: "reviews",
                    let: {
                        id: "$_id",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$restaurant_id", "$$id"],
                                },
                            },
                        },
                        {
                            $sort: {
                                date: -1,
                            },
                        },
                    ],
                    as: "reviews",
                },
            },
            {
                $addFields: {
                    reviews: "$reviews",
                },
            },
        ]
    
    let restaurant = await restaurants.aggregate(pipeline).next()
    restaurant._id = restaurant._id.toString()
    
    // Convert data to string
    restaurant.reviews.forEach(review => {
      review.date = new Date(review.date).toString()
      review._id = review._id.toString();
    });
    
    // Return data
    return restaurant
};