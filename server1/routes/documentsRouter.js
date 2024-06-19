const Router = require('express');
const router = new Router();
const documentsController = require('../controllers/documentsController');

router.post('/', documentsController.create);
router.get('/', documentsController.getAll);
router.get('/:id', documentsController.download);
router.delete('/:id', documentsController.delete)
router.put('/:id', documentsController.update);

module.exports = router;
