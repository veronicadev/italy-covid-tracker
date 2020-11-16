const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

router.get('/data/national', apiController.getNationalData);
router.get('/data/:regionId',apiController.getRegionData);
module.exports = router;