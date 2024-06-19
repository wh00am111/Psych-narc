import React, { useState, useContext } from 'react';
import {Button, Container} from "react-bootstrap";
import CreateDocuments from "../components/modals/CreateDocuments";
import CreateAdministrators from "../components/modals/CreateAdministrators";
import CreateDepartments from "../components/modals/CreateDepartments";
import CreateMassMedia from "../components/modals/CreateMassMedia";
import { Context } from "..";
import AdminUsersPanel from '../components/modals/AdminUsersPanel';

const AdminSecondPage = () => {
    const [documentsVisible, setDocumentsVisible] = useState(false)
    const [administratorsVisible, setAdministratorsVisible] = useState(false)
    const [departmentsVisible, setDepartmentsVisible] = useState(false)
    const [massmediaVisible, setMassMediaVisible] = useState(false)
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
                onClick={() => setDocumentsVisible(true)}
            >
                Добавить документ
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setAdministratorsVisible(true)}
            >
                Добавить врача в администрацию
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setDepartmentsVisible(true)}
            >
                Добавить отделение
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setMassMediaVisible(true)}
            >
                Добавить новость из сми
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setUsersPanelVisible(true)}
            >
                Управление пользователями
            </Button>
            <AdminUsersPanel show={usersPanelVisible} onHide={() => setUsersPanelVisible(false)} />
            <CreateDocuments show={documentsVisible} onHide={() => setDocumentsVisible(false)}/>
            <CreateAdministrators show={administratorsVisible} onHide={() => setAdministratorsVisible(false)}/>
            <CreateDepartments show={departmentsVisible} onHide={() => setDepartmentsVisible(false)}/>
            <CreateMassMedia show={massmediaVisible} onHide={() => setMassMediaVisible(false)}/>
        </Container>
    );
};

export default AdminSecondPage;