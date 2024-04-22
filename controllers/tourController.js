//const fs = require('fs');


//CRUD OPERATIONS FOR THE CONTROLLERS :) 

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

exports.getAllTours = async (req, res) => {
try{
  console.log(req.query);
  const tours = await Tour.find(req.query);
  /**const tours = await Tour.find({
   * duration: 5,
   * difficulty: 'easy'
   * }); */

  //const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
  /**{ duration: '5', difficulty: 'easy' }
GET /api/v1/tours/?duration=5&difficulty=easy 200 616.374 ms - 1965 */

  //we use find to find all the documents
  //const tours = await Tour.find();

  res.status(200).json({
    status: 'success',
     results: tours.length,
     data: {
    //getting all the tours from the tour collection  
       tours,
     },
  });
}catch(err){
  res.status(404).json({
    status: 'fail',
    message: err,
  })
}
};

exports.getTour = async (req, res) => {
  try{
    //we put id because is the variable that we declared on the route
    //we use findById to just find one document :)
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id: req.params.id});

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  }catch(err){
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  //const id = req.params.id * 1;
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

exports.updateTour = async (req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      //updating and returning a new document
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: 'success',
      data: {
        tour
      },
    });
  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try{
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err,
  })
};
}
