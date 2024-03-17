const express = require('express');

const router = express.Router();

const PeopleController = require('./controllers/peopleController');
const peopleController = new PeopleController();

router.get('/pessoa', peopleController.index);
router.get('/completeResume', peopleController.getAll);
router.post('/pessoa', peopleController.create);

module.exports = router;
