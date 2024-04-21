//const fs = require('fs');
const Tour = require('../models/tourModel');

//cleaning the data to not depend on the JSON file to retrieve the data
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );


//eliminating this function because mongoDB already validate our file
// exports.checkID = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };


//now our mongoose model is going to take care of that, it worked to show me
//how does the middleware worked
// exports.checkBody = (req, res, next, val) => {
//   if (req.body.name === null || req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Doesnt have name || price!',
//     });
//   }
//   next();
// };

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // console.log(req.requestTime);

  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {

  //we can do it easier than this :)
  // const newTour = new Tour({})
  // newTour.save()

  //creating documents using moongose
  const newTour = await Tour.create(req.body);
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      }
    });
  } catch (err) {
    res.status(400).json({
        status: 'fail',
        message: [err,err.message]
    })
}
}
  

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
