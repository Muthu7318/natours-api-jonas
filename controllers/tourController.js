// const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkId = (req, res, next, val) => {
//   const tour = +val > tours.length;

//   if (tour) {
//     return res.status(404).json({
//       status: 'failure',
//       message: 'expected tour is not present',
//     });
//   }

//   next();
// };

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;
  // const tour = tours.find((item) => item.id === +id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tours: tour,
  //   },
  // });
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failure',
      message: 'invalid request body',
    });
  }

  next();
};
exports.createTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};

// exports.updateTour = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<updated tour here...>',
//     },
//   });
// };

// exports.deleteTour = (req, res) => {
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// };
