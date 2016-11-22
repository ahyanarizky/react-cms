const express = require('express');
const router = express.Router();

const controller = require('../controllers/api.data')

// new data
router.post('/', controller.newData);

// show all data
router.get('/', controller.showAllData);

// edit a data
router.put('/:id', controller.editData);

// delete a data
router.delete('/:id', controller.deleteData);

// seed data
router.post('/seed', controller.seedData);

// delete all data
router.delete('/', controller.deleteAllData);

module.exports = router;
