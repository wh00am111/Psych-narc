import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateGallery } from '../../http/galleryAPI';

const EditGalleryModal = ({ show, onHide, gallery }) => {

  const [image, setImage] = useState(null);

  useEffect(() => {

    setImage(null);
  }, [gallery]);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    await updateGallery(gallery.id, formData);
    onHide();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать галерею</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Изображение</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditGalleryModal;