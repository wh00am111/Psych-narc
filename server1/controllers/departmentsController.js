const {Departments} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class departmentsController {
    async create(req, res) {
        const {name, text} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const deps = await Departments.create({image: fileName, name, text})
        return res.json(deps)
    }

    async getAll(req, res) {
        let deps = await Departments.findAll({
            limit: 5
        });
        return res.json(deps)
    }

    async getOne(req, res) {
        const {id} = req.params
        const deps = await Departments.findOne(
            {
                where: {id},
                include: [{model: Departments, as: 'info'}]
            },
        )
        return res.json(deps)
    }

    async delete(req, res) {
        const {id} = req.params;
        const departments = await Departments.destroy({where: {id}});
        return res.json(departments);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, text} = req.body;
        const { image } = req.files;
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, '../', 'static', fileName));
      
        const departments = await Departments.update({ image: fileName, name, text}, { where: { id } });
        return res.json(departments);
    }

}


module.exports = new departmentsController()
