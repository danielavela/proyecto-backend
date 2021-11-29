let express = require('express');
let router = express.Router();

const children = require('../controllers/controllers.js');


router.post('/api/child', children.createChild);
router.get('/api/child/:id', children.getChild);
router.get('/api/children', children.children);
router.put('/api/child', children.updateChild);
router.delete('/api/child/:id', children.deleteChild);

module.exports = router;