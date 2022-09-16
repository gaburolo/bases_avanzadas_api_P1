const express = require('express');
const service = require('../services/admin.service');
const router = express.Router();

const path = 'admin';

router.get(`/${path}/`, service.getData);
//router.get(`/${path}/:id`, service.getOne);
router.get(`/${path}/:Usuario`, service.getOneUser);
router.post(`/${path}/`, service.insertData);
router.put(`/${path}/:id`, service.updateAdmin);
router.delete(`/${path}/:id`, service.deleteAdmin);
module.exports = router