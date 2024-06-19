const fs = require('fs');
const { Documents } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const mime = require('mime-types');
const ApiError = require('../error/ApiError');


class documentsController {
    async create(req, res, next) {
        try {
            const { name, text } = req.body;
            const { file } = req.files;
            const fileExtension = path.extname(file.name);

            if (!['.docx', '.pdf'].includes(fileExtension)) {
                return next(ApiError.badRequest('Недопустимое расширение файла'));
            }

            const fileName = uuid.v4() + fileExtension;
            const filePath = path.resolve(__dirname, '../', 'static', fileName);

            file.mv(filePath, async (err) => {
                if (err) {
                    return next(ApiError.internal('Ошибка при загрузке файла'));
                }

                const document = await Documents.create({ name, text, file: fileName });
                return res.json(document);
            });
        } catch (error) {
            next(ApiError.internal('Ошибка при создании документа'));
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 3
        let offset = page * limit - limit
  
        let documents = await Documents.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return res.json(documents);
    }

    async download(req, res, next) {
        try {
            const { id } = req.params;

            // Найти документ по id в базе данных
            const document = await Documents.findOne({ where: { id } });

            if (!document) {
                return next(ApiError.notFound('Документ не найден'));
            }

            const filePath = path.resolve(__dirname, '../', 'static', document.file);

            // Проверка, существует ли файл
            if (!fs.existsSync(filePath)) {
                return next(ApiError.notFound('Файл не найден на сервере'));
            }

            // Установить заголовки для скачивания файла
            res.setHeader('Content-Type', mime.contentType(path.extname(document.file)));
            res.setHeader('Content-Disposition', `attachment; filename=${document.file}`);

            // Отправить файл
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (error) {
            next(ApiError.internal('Ошибка при скачивании файла'));
        }
    }

    async delete(req, res) {
        const {id} = req.params;
        const docs = await Documents.destroy({where: {id}});
        return res.json(docs);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, text } = req.body;
        const { file } = req.files;
        const fileExtension = path.extname(file.name);

        if (!['.docx', '.pdf'].includes(fileExtension)) {
            return next(ApiError.badRequest('Недопустимое расширение файла'));
        }

        const fileName = uuid.v4() + fileExtension;
        const filePath = path.resolve(__dirname, '../', 'static', fileName);

        file.mv(filePath, async (err) => {
            if (err) {
                return next(ApiError.internal('Ошибка при загрузке файла'));
            }

            const document = await Documents.update({ name, text, file: fileName}, { where: { id } });
            return res.json(document);
        });
    }

}

module.exports = new documentsController();
