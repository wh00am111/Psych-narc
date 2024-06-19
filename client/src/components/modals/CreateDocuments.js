import React, { useContext, useState } from 'react';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { createDocument } from '../../http/documentsAPI';
import DocumentsList from './DocumentsList'; // Предполагается, что такой компонент существует

const CreateDocuments = observer(({ show, onHide }) => {
    const { documents } = useContext(Context);
    const [doc, setDoc] = useState(null);
    const [docName, setDocName] = useState('');
    const [docText, setDocText] = useState('');
    const [showDocumentsList, setShowDocumentsList] = useState(false);

    const selectFile = e => {
        setDoc(e.target.files[0]);
    };

    const addDocument = async () => {
        const formData = new FormData();
        formData.append('name', docName);
        formData.append('text', docText);
        formData.append('file', doc);
        createDocument(formData).then(data => onHide());
    };

    const handleShowDocumentsList = () => {
        setShowDocumentsList(true);
    };

    const handleCloseDocumentsList = () => {
        setShowDocumentsList(false);
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
                    Добавить документ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        onChange={selectFile}
                        className="mt-3"
                        placeholder="Выберите документ"
                        type='file'
                    />
                    <Form.Control
                        value={docName}
                        onChange={e => setDocName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название документа"
                    />
                    <Form.Control
                        value={docText}
                        onChange={e => setDocText(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание документа"
                    />
                </Form>
                <Button variant="primary" onClick={handleShowDocumentsList}>Документы</Button>
                <DocumentsList show={showDocumentsList} onHide={handleCloseDocumentsList} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addDocument}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDocuments;