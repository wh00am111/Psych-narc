import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Context } from '../..';
import { createMassMedia } from '../../http/massmediaAPI';
import MassMediaList from './MassMediaList'; // Предполагается, что такой компонент существует

const CreateMassMedia = ({ show, onHide }) => {
    const { massmedia } = useContext(Context);
    const [massmImg, setMassmImg] = useState(null);
    const [massmName, setMassmName] = useState('');
    const [massmDate, setMassmDate] = useState('');
    const [massmText, setMassmText] = useState('');
    const [info, setInfo] = useState([]);
    const [showMassMediaList, setShowMassMediaList] = useState(false);

    const selectFile = e => {
        setMassmImg(e.target.files[0]);
    };

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const addMassMedia = () => {
        const formData = new FormData();
        formData.append('name', massmName);
        formData.append('text', massmText);
        formData.append('date', massmDate);
        formData.append('image', massmImg);
        createMassMedia(formData).then(data => onHide());
    };

    const handleShowMassMediaList = () => {
        setShowMassMediaList(true);
    };

    const handleCloseMassMediaList = () => {
        setShowMassMediaList(false);
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
                    Добавить новость
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите заголовок публикации"
                        value={massmName}
                        onChange={e => setMassmName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите текст публикации"
                        value={massmText}
                        onChange={e => setMassmText(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите дату и имя автора"
                        value={massmDate}
                        onChange={e => setMassmDate(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Выберите файл"
                        type="file"
                        onChange={selectFile}
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
                                        placeholder="Введите название новости"
                                        type="text"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите описание новости"
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
                <Button variant="primary" onClick={handleShowMassMediaList}>Новости</Button>
                <MassMediaList show={showMassMediaList} onHide={handleCloseMassMediaList} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addMassMedia}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMassMedia;