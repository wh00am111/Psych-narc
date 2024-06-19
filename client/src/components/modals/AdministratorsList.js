import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { fetchAdministrators, deleteAdministrators } from '../../http/administratorsAPI'; // Импорт функции fetchAdministrators
import EditAdministratorsModal from './EditAdministratorsModal';

const AdministratorsList = ({ show, onHide }) => {
  const [administratorsList, setAdministratorsList] = useState([]);
  const [selectedAdministrators, setSelectedAdministrators] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (show) {
      fetchAdministratorsForPage(currentPage);
    }
  }, [show, currentPage]);

  const fetchAdministratorsForPage = async (page) => {
    const data = await fetchAdministrators(page);
    setAdministratorsList(data.rows);
    setTotalPages(Math.ceil(data.count / 3)); // Предполагается, что limit равен 3
  };

  const handleDelete = async (id) => {
    await deleteAdministrators(id);
    // Обновляем список новостей, удалив удаленную новость
    setAdministratorsList(administratorsList.filter((administrators) => administrators.id !== id));
  };

  const handleEdit = (administrators) => {
    setSelectedAdministrators(administrators);
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
        <Modal.Title>Список новостей</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {administratorsList.map((administrators) => (
          <div key={administrators.id}>
            <h2>{administrators.name}</h2>
            <Button variant="danger" onClick={() => handleDelete(administrators.id)}>
              Удалить
            </Button>
            <Button variant="primary" onClick={() => handleEdit(administrators)}>
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
      <EditAdministratorsModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        administrators={selectedAdministrators}
      />
    </Modal>
  );
};

export default AdministratorsList;