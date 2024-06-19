import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { fetchServices, deleteServices } from '../../http/servicesAPI'; // Импорт функции fetchServices
import EditServicesModal from './EditServicesModal';

const ServicesList = ({ show, onHide }) => {
  const [servicesList, setServicesList] = useState([]);
  const [selectedServices, setSelectedServices] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (show) {
      fetchServicesForPage(currentPage);
    }
  }, [show, currentPage]);

  const fetchServicesForPage = async (page) => {
    const data = await fetchServices(page);
    setServicesList(data.rows);
    setTotalPages(Math.ceil(data.count / 3)); // Предполагается, что limit равен 3
  };

  const handleDelete = async (id) => {
    await deleteServices(id);
    // Обновляем список новостей, удалив удаленную новость
    setServicesList(servicesList.filter((services) => services.id !== id));
  };

  const handleEdit = (services) => {
    setSelectedServices(services);
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
        <Modal.Title>Список сервисов</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {servicesList.map((services) => (
          <div key={services.id}>
            <h2>{services.name}</h2>
            <Button variant="danger" onClick={() => handleDelete(services.id)}>
              Удалить
            </Button>
            <Button variant="primary" onClick={() => handleEdit(services)}>
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
      <EditServicesModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        services={selectedServices}
      />
    </Modal>
  );
};

export default ServicesList;