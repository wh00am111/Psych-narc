import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createAdministrators = async (admins) => {
    const {data} = await $authHost.post('api/administrators', admins)
    return data
}

export const fetchAdministrators = async (page, limit=3) => {
    const {data} = await $host.get('api/administrators', {params: {
        page, limit
    }})
    return data
}

export const fetchOneAdministrators = async (id) => {
    const {data} = await $host.get('api/administrators/' + id)
    return data
}

export const deleteAdministrators = async (id) => {
    const {data} = await $authHost.delete('api/administrators/' + id);
    return data;
};

export const updateAdministrators = async (id, administrators) => {
    const { data } = await $authHost.put(`api/administrators/${id}`, administrators);
    return data;
};

export const getAllAdministrators = async (page, limit = 3) => {
    const { data } = await $host.get('api/administrators', { params: { page, limit } });
    return data.rows; // Извлекаем массив новостей из ответа сервера
  };