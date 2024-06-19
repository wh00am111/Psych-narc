const Router = require('express')
const router = new Router()
const partnersController = require('../controllers/partnersController')


router.post('/', partnersController.create)
router.get('/', partnersController.getAll)
router.get('/:id', partnersController.getOne)
router.delete('/:id', partnersController.delete)
router.put('/:id', partnersController.update);


module.exports = router