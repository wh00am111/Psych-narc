import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import OtherServicesList from './OtherServicesList'; // Предполагается, что такой компонент существует

const CreateOtherServices = ({ show, onHide }) => {
    const [info, setInfo] = useState([]);
    const [showOtherServicesList, setShowOtherServicesList] = useState(false);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const handleShowOtherServicesList = () => {
        setShowOtherServicesList(true);
    };

    const handleCloseOtherServicesList = () => {
        setShowOtherServicesList(false);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить услугу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите название услуги"
                    />
                    <Form.Group className="mt-3">
                        <Form.Control as="textarea" rows={5} placeholder="Введите описание услуги" />
                    </Form.Group>
                    <Form.Control
                        className="mt-3"
                        placeholder="Выберите файл"
                        type="file"
                    />
                    <hr />
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить описание
                    </Button>
                    {
                        info.map(i =>
                            <Row className="mt-4" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите название услуги"
                                        type="text"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите описание услуги"
                                        type="text"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button onClick={() => removeInfo(i.number)} variant={"outline-danger"}>Удалить</Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
                <Button variant="primary" onClick={handleShowOtherServicesList}>Услуги</Button>
                <OtherServicesList show={showOtherServicesList} onHide={handleCloseOtherServicesList} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateOtherServices;