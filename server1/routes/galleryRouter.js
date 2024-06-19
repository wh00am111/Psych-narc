const Router = require('express')
const router = new Router()
const galleryController = require('../controllers/galleryController')


router.post('/', galleryController.create)
router.get('/', galleryController.getAll)
router.get('/:id', galleryController.getOne)
router.delete('/:id', galleryController.delete)
router.put('/:id', galleryController.update);


module.exports = router