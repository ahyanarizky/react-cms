var express = require('express');
var router = express.Router();
const dataController = require('../controllers/controllers.api.data')

router.get('/', dataController.getAllData)
router.post('/', dataController.createData)
router.delete('/', dataController.deleteAllData)
router.delete('/:id', dataController.deleteDataById)
router.put('/:id', dataController.updateData)

module.exports = router;