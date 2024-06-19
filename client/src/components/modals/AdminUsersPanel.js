import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { fetchUsers, updateUserRole } from '../../http/userAPI';

const AdminUsersPanel = ({ show, onHide }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (show) {
            fetchUsers()
                .then(data => setUsers(data))
                .catch(error => console.error(error));
        }
    }, [show]);

    const handleRoleChange = (id, newRole) => {
        const currentRole = users.find(user => user.id === id).permission;
        if (newRole !== currentRole) {
            updateUserRole(id, newRole)
                .then(() => {
                    setUsers(users.map(user => user.id === id ? { ...user, permission: newRole } : user));
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Управление пользователями</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {users.filter(user => user.id >= 2).map(user => (
                    <Card key={user.id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>
                                {user.email} - {user.permission}
                            </Card.Text>
                            <Form.Control 
                                as="select" 
                                custom 
                                defaultValue={user.permission} 
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </Form.Control>
                        </Card.Body>
                    </Card>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminUsersPanel;