const Router = require('express')
const router = new Router()
const administratorsController = require('../controllers/administratorsController')


router.post('/', administratorsController.create)
router.get('/', administratorsController.getAll)
router.get('/:id', administratorsController.getOne)
router.delete('/:id', administratorsController.delete)
router.put('/:id', administratorsController.update);

module.exports = router