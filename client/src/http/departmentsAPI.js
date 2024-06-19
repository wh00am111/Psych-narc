import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createDepartments = async (deps) => {
    const {data} = await $authHost.post('api/departments', deps)
    return data
}

export const fetchDepartments = async () => {
    const {data} = await $host.get('api/departments')
    return data
}

export const fetchOneDepartments = async (id) => {
    const {data} = await $host.get('api/departments/' + id)
    return data
}

export const deleteDepartments = async (id) => {
    const {data} = await $authHost.delete('api/departments/' + id);
    return data;
};

export const updateDepartments = async (id, departments) => {
    const { data } = await $authHost.put(`api/departments/${id}`, departments);
    return data;
};

export const getAllDepartments = async () => {
    const { data } = await $host.get('api/departments');
    return data.rows; // Извлекаем массив новостей из ответа сервера
};