import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    place: String,
    type: String,
    address: String,
    features: [String],
    rating: Number,
    images: [String],
    types: [String],
    establishments: [String],
    meals: [String],
    restrictions: [String],
    open: { type: Boolean }, // ✅ Corrected
    advancePrice: Number,
    reviews: [
      {
        name: String,
        text: String,
        date: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

export const Restaurantmodel = mongoose.model(
  "Restaurantmodel",
  restaurantSchema
);

// "name": "Shere Punjab Dhaba",
//   "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/8b/6b/b7/hotel.jpg?w=500&h=-1&s=1",
//   "place": "Kolaghat",
//   "type": "Desi, Punjabi, Thali",
//   "address": "No 15 Grand Trunk Road Kolaghat, Howrah 711106 India",
//   "features": ["Inside-Outside", "Parking", "Vegan Option"],
//   "rating": 4.4,
//   "images": [
//     "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/8b/6b/b7/hotel.jpg?w=500&h=-1&s=1",
//     "https://content.jdmagicbox.com/comp/kolkata/h7/033pxx33.xx33.120331185027.k8h7/catalogue/sher-e-punjab-michael-nagar-kolkata-home-delivery-restaurants-66c4q.jpg",
//     "https://content.jdmagicbox.com/comp/midnapore/z6/9999pxxxx.xxxx.100915155600.j9z6/catalogue/sher-e-punjab-hotel-kolaghat-midnapore-north-indian-restaurants-fmx4mygqac.jpg",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH9Vd68e6p9EEsy9tW5pJE6BxbhBcQS7tltQ&s"
//   ],
//   "types": ["Desi", "Punjabi", "Thali"],
//   "establishments": ["Quick Snacks", "Home Delivery", "Thali"],
//   "meals": ["Brunch", "Lunch", "Dinner"],
//   "open": true,
//   "advancePrice": 150,
//   "reviews": [
//     {
//       "name": "Sayan Pal",
//       "text": "It was nice experience to have a delicious day in this restaurant",
//       "date": "05-02-2025",
//       "rating": 3
//     }
//   ]
