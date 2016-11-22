const express = require('express');
const router = express.Router();

const controller = require('../controllers/api.dataDate')

// new datadate
router.post('/', controller.newDataDate);

// show all datadate
router.get('/', controller.showAllDataDate);

// edit a datadate
router.put('/:id', controller.editDataDate);

// delete a datadate
router.delete('/:id', controller.deleteDataDate);

// seed datadate
router.post('/seed', controller.seedDataDate);

// delete all datadate
router.delete('/', controller.deleteAllDataDate);


module.exports = router;
