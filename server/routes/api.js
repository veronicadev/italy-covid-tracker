const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

router.post('/data/national', apiController.getLatestNationalData);
router.post('/data/province',apiController.getProvinceData);
router.post('/data/region/all',apiController.getRegionsData);
router.post('/data/region',apiController.getRegionData);
router.post('/data/trend/national',apiController.getTrendNationalData);
module.exports = router;