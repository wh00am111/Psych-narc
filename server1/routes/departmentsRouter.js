const Router = require('express')
const router = new Router()
const departmentsController = require('../controllers/departmentsController')


router.post('/', departmentsController.create)
router.get('/', departmentsController.getAll)
router.get('/:id', departmentsController.getOne)
router.delete('/:id', departmentsController.delete)
router.put('/:id', departmentsController.update);


module.exports = router