const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

router.get('/data/national/latest', apiController.getLatestNationalData);
router.post('/data/province',apiController.getProvinceData);
router.post('/data/region',apiController.getRegionData);
module.exports = router;