import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { 
    ADMIN_MAIN_PAGE_ROUTE, 
    ADMIN_SECOND_PAGE_ROUTE, 
    ADMIN_THIRD_PAGE_ROUTE, 
    ADMIN_VACANCIES_ROUTE, 
    ADMIN_FOURTH_PAGE_ROUTE 
} from "../utils/consts";
import { useNavigate } from "react-router-dom";

const FloatingAdminButton = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    // Проверка, что пользователь авторизован и имеет права администратора
    if (!user.isAuth || user.user.permission !== 'ADMIN') {
        return null; // Не отображать кнопку, если пользователь не имеет нужных прав
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" className="floating-button" style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000
            }}>
                Админ-панель
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate(ADMIN_MAIN_PAGE_ROUTE)}>Первая страница</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(ADMIN_SECOND_PAGE_ROUTE)}>Вторая страница</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(ADMIN_THIRD_PAGE_ROUTE)}>Третья страница</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(ADMIN_VACANCIES_ROUTE)}>Четвёртая страница</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(ADMIN_FOURTH_PAGE_ROUTE)}>Пятая страница</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default FloatingAdminButton;