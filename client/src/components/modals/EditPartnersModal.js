import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updatePartners } from '../../http/partnersAPI';

const EditPartnersModal = ({ show, onHide, partners }) => {
  const [name, setName] = useState(partners ? partners.name : '');
  const [image, setImage] = useState(null);

  useEffect(() => {
    setName(partners ? partners.name : '');
    setImage(null);
  }, [partners]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }
    await updatePartners(partners.id, formData);
    onHide();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать сервис</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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

export default EditPartnersModal;