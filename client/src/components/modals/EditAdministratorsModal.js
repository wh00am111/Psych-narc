import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateAdministrators } from '../../http/administratorsAPI';

const EditAdministratorsModal = ({ show, onHide, administrators }) => {
  const [name, setName] = useState(administrators ? administrators.name : '');
  const [text, setText] = useState(administrators ? administrators.text : '');
  const [image, setImage] = useState(null);

  useEffect(() => {
    setName(administrators ? administrators.name : '');
    setText(administrators ? administrators.text : '');
    setImage(null);
  }, [administrators]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }
    await updateAdministrators(administrators.id, formData);
    onHide();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать новость</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>ФИО</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Должность</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
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

export default EditAdministratorsModal;