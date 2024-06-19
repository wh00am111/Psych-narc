import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Context } from '../..';
import { createServices } from '../../http/servicesAPI';
import { observer } from 'mobx-react-lite';
import ServicesList from './ServicesList'; // Предполагается, что такой компонент существует

const CreateServices = observer(({ show, onHide }) => {
    const { popularSev } = useContext(Context);
    const [serviceImg, setServiceImg] = useState(null);
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [showServicesList, setShowServicesList] = useState(false);

    const selectFile = e => {
        setServiceImg(e.target.files[0]);
    };

    const addServices = () => {
        const formData = new FormData();
        formData.append('name', serviceName);
        formData.append('text', serviceDescription);
        formData.append('image', serviceImg);
        createServices(formData).then(data => onHide());
    };

    const handleShowServicesList = () => {
        setShowServicesList(true);
    };

    const handleCloseServicesList = () => {
        setShowServicesList(false);
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
                        value={serviceName}
                        onChange={e => setServiceName(e.target.value)}
                        placeholder="Введите название услуги"
                    />
                    <Form.Control
                        className="mt-3"
                        value={serviceDescription}
                        onChange={e => setServiceDescription(e.target.value)}
                        placeholder="Введите описание услуги"
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={selectFile}
                        placeholder="Выберите файл"
                        type="file"
                    />
                </Form>
                <Button variant="primary" onClick={handleShowServicesList}>Услуги</Button>
                <ServicesList show={showServicesList} onHide={handleCloseServicesList} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addServices}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateServices;