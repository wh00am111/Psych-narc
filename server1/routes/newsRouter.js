const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')


router.post('/', newsController.create)
router.get('/', newsController.getAll)
router.get('/:id', newsController.getOne)
router.delete('/:id', newsController.delete)
router.put('/:id', newsController.update);


module.exports = router