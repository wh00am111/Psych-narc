const Router = require('express')
const router = new Router()
const servicesController = require('../controllers/servicesController')


router.post('/', servicesController.create)
router.get('/', servicesController.getAll)
router.get('/:id', servicesController.getOne)
router.delete('/:id', servicesController.delete)
router.put('/:id', servicesController.update);


module.exports = router