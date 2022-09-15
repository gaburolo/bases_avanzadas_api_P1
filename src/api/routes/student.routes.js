const express = require('express');
const service = require('../services/student.service');
const router = express.Router();

const path = 'student';

router.get(`/${path}/`, service.getData);
router.post(`/${path}/`, service.insertData);

module.exports = router