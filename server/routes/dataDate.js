var express = require('express');
var router = express.Router();
const dataDateController = require('../controllers/controllers.api.dataDate')

router.get('/seed', dataDateController.seedData)
router.get('/', dataDateController.getAllData)
router.get('/id/:id', dataDateController.getDataById)
router.get('/letter/:letter', dataDateController.getDataByLetter)
router.get('/frequency/:frequency', dataDateController.getDataByFrequency)
router.post('/', dataDateController.createData)
router.delete('/', dataDateController.deleteAllData)
router.delete('/:id', dataDateController.deleteDataById)
router.put('/:id', dataDateController.updateData)

module.exports = router;