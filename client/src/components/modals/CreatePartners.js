import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Context } from '../..';
import { createPartners } from '../../http/partnersAPI';
import { observer } from 'mobx-react-lite';
import PartnersList from './PartnersList'; // Предполагается, что такой компонент существует

const CreatePartners = observer(({ show, onHide }) => {
    const { partners } = useContext(Context);
    const [partnerImg, setPartnerImg] = useState(null);
    const [partnerName, setPartnerName] = useState('');
    const [showPartnersList, setShowPartnersList] = useState(false);

    const selectFile = e => {
        setPartnerImg(e.target.files[0]);
    };

    const addPartner = () => {
        const formData = new FormData();
        formData.append('name', partnerName);
        formData.append('image', partnerImg);
        createPartners(formData).then(data => onHide());
    };

    const handleShowPartnersList = () => {
        setShowPartnersList(true);
    };

    const handleClosePartnersList = () => {
        setShowPartnersList(false);
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
                    Добавить партнёра
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        value={partnerName}
                        onChange={e => setPartnerName(e.target.value)}
                        placeholder="Введите название партнёра"
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={selectFile}
                        placeholder="Выберите файл"
                        type="file"
                    />
                </Form>
                <Button variant="primary" onClick={handleShowPartnersList}>Партнёры</Button>
                <PartnersList show={showPartnersList} onHide={handleClosePartnersList} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addPartner}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePartners;