import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { fetchDocument, deleteDocuments } from '../../http/documentsAPI'; // Импорт функции fetchDocuments
import EditDocumentsModal from './EditDocumentsModal';

const DocumentsList = ({ show, onHide }) => {
  const [documentsList, setDocumentsList] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (show) {
      fetchDocumentsForPage(currentPage);
    }
  }, [show, currentPage]);

  const fetchDocumentsForPage = async (page) => {
    const data = await fetchDocument(page);
    setDocumentsList(data.rows);
    setTotalPages(Math.ceil(data.count / 3)); // Предполагается, что limit равен 3
  };

  const handleDelete = async (id) => {
    await deleteDocuments(id);
    // Обновляем список новостей, удалив удаленную новость
    setDocumentsList(documentsList.filter((documents) => documents.id !== id));
  };

  const handleEdit = (documents) => {
    setSelectedDocuments(documents);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Список документов</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {documentsList.map((documents) => (
          <div key={documents.id}>
            <h2>{documents.name}</h2>
            <Button variant="danger" onClick={() => handleDelete(documents.id)}>
              Удалить
            </Button>
            <Button variant="primary" onClick={() => handleEdit(documents)}>
              Редактировать
            </Button>
          </div>
        ))}
        <div>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Предыдущая страница
          </Button>
          <span> Страница {currentPage} из {totalPages}</span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Следующая страница
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
      <EditDocumentsModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        documents={selectedDocuments}
      />
    </Modal>
  );
};

export default DocumentsList;