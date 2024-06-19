import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { createGallery } from '../../http/galleryAPI';
import GalleryList from './GalleryList'; // Предполагается, что такой компонент существует

const CreateGallery = observer(({ show, onHide }) => {
    const { gallery } = useContext(Context);
    const [galleryImg, setGalleryImg] = useState(null);
    const [showGalleryList, setShowGalleryList] = useState(false);

    const selectFile = e => {
        setGalleryImg(e.target.files[0]);
    };

    const addGallery = () => {
        const formData = new FormData();
        formData.append('image', galleryImg);
        createGallery(formData).then(data => onHide());
    };

    const handleShowGalleryList = () => {
        setShowGalleryList(true);
    };

    const handleCloseGalleryList = () => {
        setShowGalleryList(false);
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
                    Добавить изображение в галерею
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        onChange={selectFile}
                        className="mt-3"
                        placeholder="Выберите файл"
                        type="file"
                    />
                </Form>
                <Button variant="primary" onClick={handleShowGalleryList}>Галерея</Button>
                <GalleryList show={showGalleryList} onHide={handleCloseGalleryList} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addGallery}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateGallery;