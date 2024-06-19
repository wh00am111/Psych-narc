import React, { useState, useContext } from 'react';
import {Button, Container} from "react-bootstrap";
import CreateNews from "../components/modals/CreateNews";
import CreateServices from "../components/modals/CreateServices";
import CreatePartners from "../components/modals/CreatePartners";
import CreateGallery from "../components/modals/CreateGallery";
import CreateLine from '../components/modals/CreateLine';
import { Context } from "..";
import AdminUsersPanel from '../components/modals/AdminUsersPanel';

const AdminMainPage = () => {
    const [newsVisible, setNewsVisible] = useState(false)
    const [servicesVisible, setServicesVisible] = useState(false)
    const [partnersVisible, setPartnersVisible] = useState(false)
    const [galleryVisible, setGalleryVisible] = useState(false)
    const [lineVisible, setLineVisible] = useState(false)
    const [usersPanelVisible, setUsersPanelVisible] = useState(false);
    const { user } = useContext(Context);

    if (!user.isAuth || user.user.permission !== 'ADMIN') {
        alert("у вас нет доступа"); // Отображаем модальное окно с сообщением
        window.location.href = "http://localhost:3000"; // Перенаправляем пользователя обратно на localhost:3000
        return null; // Возвращаем null, чтобы не отображать кнопку
    }

    return (
        <Container className="d-flex flex-column">
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setNewsVisible(true)}
            >
                Добавить новость
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setServicesVisible(true)}
            >
                Добавить услуги
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setPartnersVisible(true)}
            >
                Добавить партнёра
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setGalleryVisible(true)}
            >
                Добавить фото в галерею
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setLineVisible(true)}
            >
                Добавить текст в бегущую строку
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setUsersPanelVisible(true)}
            >
                Управление пользователями
            </Button>
            <AdminUsersPanel show={usersPanelVisible} onHide={() => setUsersPanelVisible(false)} />
            <CreateNews show={newsVisible} onHide={() => setNewsVisible(false)}/>
            <CreateServices show={servicesVisible} onHide={() => setServicesVisible(false)}/>
            <CreatePartners show={partnersVisible} onHide={() => setPartnersVisible(false)}/>
            <CreateGallery show={galleryVisible} onHide={() => setGalleryVisible(false)}/>
            <CreateLine show={lineVisible} onHide={() => setLineVisible(false)}/>

        </Container>
    );
};

export default AdminMainPage;