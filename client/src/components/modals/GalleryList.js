import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { fetchGallery, deleteGallery } from '../../http/galleryAPI'; // Импорт функции fetchGallery
import EditGalleryModal from './EditGalleryModal';

const GalleryList = ({ show, onHide }) => {
  const [galleryList, setGalleryList] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (show) {
      fetchGalleryForPage(currentPage);
    }
  }, [show, currentPage]);

  const fetchGalleryForPage = async (page) => {
    const data = await fetchGallery(page);
    setGalleryList(data.rows);
    setTotalPages(Math.ceil(data.count / 3)); // Предполагается, что limit равен 3
  };

  const handleDelete = async (id) => {
    await deleteGallery(id);
    // Обновляем список новостей, удалив удаленную новость
    setGalleryList(galleryList.filter((gallery) => gallery.id !== id));
  };

  const handleEdit = (gallery) => {
    setSelectedGallery(gallery);
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
        <Modal.Title>Список изображений</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {galleryList.map((gallery) => (
          <div key={gallery.id}>
            <h2>{gallery.name}</h2>
            <Button variant="danger" onClick={() => handleDelete(gallery.id)}>
              Удалить
            </Button>
            <Button variant="primary" onClick={() => handleEdit(gallery)}>
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
      <EditGalleryModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        gallery={selectedGallery}
      />
    </Modal>
  );
};

export default GalleryList;