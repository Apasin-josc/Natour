const mongoose = require('mongoose');

// //most basic way of describing a schema
// const tourSchema = new mongoose.Schema({
//   name: String,
//   rating: Number,
//   price: Number
// })

// another coolest way of describing a schema // blue print as classes in JavaScript / C#
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      //adding some validators to have required fields and errors displayed on the client side :)
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      //later we are going to apply validators to required the difficulty of easy, medium and hard!
      required: [true, 'A tour must have a difficulty']
    },
    //we don't add the required field into the ratings because that's going to be calculated later on with the users prompts
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
      type: String,
      //trim only works for strings, removes the white spaces
      trim: true,
      required: [true, 'A tour must have a summary']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      //name of the image as a reference because it's going to be stored on the database, we leave images on the FS :)
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      //putting the time stamp
      type: Date,
      default: Date.now()
    },
    startedDates: [Date],
  });
  // creating a model to use our tourSchema to create an object 🔥
  const Tour = mongoose.model('Tour', tourSchema);

  module.exports = Tour;