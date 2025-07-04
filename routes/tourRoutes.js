const express = require('express');

const {
  aliasTopTours,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkId);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route(`/`).get(getAllTours).post(createTour);

router.route(`/:id`).get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
