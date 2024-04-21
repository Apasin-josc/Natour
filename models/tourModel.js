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
      unique: true
    },
    rating: {
      type: Number,
      default: 4.5
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    }
  });
  // creating a model to use our tourSchema to create an object 🔥
  const Tour = mongoose.model('Tour', tourSchema);

  module.exports = Tour;