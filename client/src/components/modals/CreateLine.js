import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { Context } from '../..';
import { createLine } from '../../http/lineAPI';
import LineList from './LineList'; // Предполагается, что такой компонент существует

const CreateLine = ({ show, onHide }) => {
    const { line } = useContext(Context);
    const [lineText, setLineText] = useState('');
    const [showLineList, setShowLineList] = useState(false);

    const addLine = () => {
        const formData = new FormData();
        formData.append('text', lineText);
        createLine(formData).then(data => onHide());
    };

    const handleShowLineList = () => {
        setShowLineList(true);
    };

    const handleCloseLineList = () => {
        setShowLineList(false);
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
                    Добавить текст в бегущую строку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите текст для бегущей строки"
                        value={lineText}
                        onChange={e => setLineText(e.target.value)}
                    />
                </Form>
                <Button variant="primary" onClick={handleShowLineList}>Бегущая строка</Button>
                <LineList show={showLineList} onHide={handleCloseLineList} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addLine}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateLine;