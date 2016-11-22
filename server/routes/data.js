var express = require('express');
var router = express.Router();
const dataController = require('../controllers/controllers.api.data')

router.get('/', dataController.getAllData)
router.get('/:id', dataController.getDataById)
router.post('/', dataController.createData)
router.delete('/', dataController.deleteDataById)
router.put('/', dataController.updateData)

module.exports = router;