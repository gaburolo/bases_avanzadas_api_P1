const express = require('express');
const model = require('../services/clubs.service');

const router = express.Router();

const path = 'clubs';

router.get(`/${path}/`, model.getData);


module.exports = router