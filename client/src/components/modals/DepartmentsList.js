import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { fetchDepartments, getAllDepartments, deleteDepartments, updateDepartments } from '../../http/departmentsAPI'; // Импорт функции getAllDepartments
import EditDepartmentsModal from './EditDepartmentsModal';

const DepartmentsList = ({ show, onHide }) => {
  const [departmentsList, setDepartmentsList] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (show) {
      fetchAllDepartments();
    }
  }, [show]);

  const fetchAllDepartments = async () => {
    const data = await fetchDepartments();
    setDepartmentsList(data);
  };

  const handleDelete = async (id) => {
    await deleteDepartments(id);
    // Обновляем список отделений, удалив удаленное отделение
    setDepartmentsList(departmentsList.filter((departments) => departments.id !== id));
  };

  const handleEdit = (departments) => {
    setSelectedDepartments(departments);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Список отделений</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {departmentsList.map((departments) => (
          <div key={departments.id}>
            <h2>{departments.name}</h2>
            <Button variant="danger" onClick={() => handleDelete(departments.id)}>
              Удалить
            </Button>
            <Button variant="primary" onClick={() => handleEdit(departments)}>
              Редактировать
            </Button>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
      <EditDepartmentsModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        departments={selectedDepartments}
      />
    </Modal>
  );
};

export default DepartmentsList;