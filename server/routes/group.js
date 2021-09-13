const router = require('express').Router();
const { createGroup, getGroup, modifyGroup, deleteGroup } = require('../controller/GroupController');

router.post('/', createGroup);
router.get('/', getGroup);
router.patch('/', modifyGroup);
router.delete('/', deleteGroup);

module.exports = router;