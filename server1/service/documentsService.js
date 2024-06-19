const Documents = require('../models/models'); // Предполагается, что у вас есть модель Documents

async function getDocumentPathById(id) {
    try {
        const document = await Documents.findById(id);
        if (!document) {
            throw new Error('Document not found');
        }
        return document.file; // Предполагается, что в модели Documents есть поле file, которое содержит путь к файлу
    } catch (error) {
        throw new Error('Error retrieving document path');
    }
}

module.exports = {
    getDocumentPathById
};