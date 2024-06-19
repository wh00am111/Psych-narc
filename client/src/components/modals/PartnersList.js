import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { fetchPartners, deletePartners } from '../../http/partnersAPI'; // Импорт функции fetchPartners
import EditPartnersModal from './EditPartnersModal';

const PartnersList = ({ show, onHide }) => {
  const [partnersList, setPartnersList] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (show) {
      fetchPartnersForPage(currentPage);
    }
  }, [show, currentPage]);

  const fetchPartnersForPage = async (page) => {
    const data = await fetchPartners(page);
    setPartnersList(data.rows);
    setTotalPages(Math.ceil(data.count / 3)); // Предполагается, что limit равен 3
  };

  const handleDelete = async (id) => {
    await deletePartners(id);
    // Обновляем список новостей, удалив удаленную новость
    setPartnersList(partnersList.filter((partners) => partners.id !== id));
  };

  const handleEdit = (partners) => {
    setSelectedPartners(partners);
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
        <Modal.Title>Список партнёров</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {partnersList.map((partners) => (
          <div key={partners.id}>
            <h2>{partners.name}</h2>
            <Button variant="danger" onClick={() => handleDelete(partners.id)}>
              Удалить
            </Button>
            <Button variant="primary" onClick={() => handleEdit(partners)}>
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
      <EditPartnersModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        partners={selectedPartners}
      />
    </Modal>
  );
};

export default PartnersList;