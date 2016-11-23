const express = require('express');
const router = express.Router();
const controller = require('../controller/data.controller')

router.get('/', controller.getData)
router.get('/:id', controller.getOneData)
router.post('/', controller.createData)
router.put('/', controller.updateData)
router.delete('/', controller.deleteData)
router.delete('/delete_all', controller.deleteAllData)

module.exports = router;
