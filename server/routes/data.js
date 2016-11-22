var express = require('express');
var router = express.Router();
const dataController = require('../controllers/controllers.api.data')

router.get('/seed', dataController.seedData)
router.get('/', dataController.getAllData)
router.get('/id/:id', dataController.getDataById)
router.get('/letter/:letter', dataController.getDataByLetter)
router.get('/frequency/:frequency', dataController.getDataByFrequency)
router.post('/', dataController.createData)
router.delete('/', dataController.deleteAllData)
router.delete('/:id', dataController.deleteDataById)
router.put('/:id', dataController.updateData)

module.exports = router;