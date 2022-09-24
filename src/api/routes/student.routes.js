const express = require('express');
const service = require('../services/student.service');
const router = express.Router();

const path = 'student';

router.get(`/${path}/`, service.getData);
router.get(`/${path}/mostsugg`, service.getMostSugg);
//router.get(`/${path}/:id`, service.getOne);
router.get(`/${path}/:Usuario`, service.getOneUser);
router.post(`/${path}/`, service.insertData);
//router.put(`/${path}/:id`, service.updateStudent);
router.put(`/${path}/:Usuario`, service.addClub);
router.delete(`/${path}/:id`, service.deleteStudent);
module.exports = router