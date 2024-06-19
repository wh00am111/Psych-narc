import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateDepartments } from '../../http/departmentsAPI';

const EditDepartmentsModal = ({ show, onHide, departments }) => {
  const [name, setName] = useState(departments ? departments.name : '');
  const [text, setText] = useState(departments ? departments.text : '');
  const [image, setImage] = useState(null);

  useEffect(() => {
    setName(departments ? departments.name : '');
    setText(departments ? departments.text : '');
    setImage(null);
  }, [departments]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }
    await updateDepartments(departments.id, formData);
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
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Текст</Form.Label>
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

export default EditDepartmentsModal;