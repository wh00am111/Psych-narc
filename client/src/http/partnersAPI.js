import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createPartners = async (partners) => {
    const {data} = await $authHost.post('api/partners', partners)
    return data
}

export const fetchPartners = async (page, limit=3) => {
    const {data} = await $host.get('api/partners', {params: {
        page, limit
    }})
    return data
}

export const fetchOnePartners = async (id) => {
    const {data} = await $host.get('api/partners/' + id)
    return data
}

export const deletePartners = async (id) => {
    const {data} = await $authHost.delete('api/partners/' + id);
    return data;
};

export const updatePartners = async (id, partners) => {
    const { data } = await $authHost.put(`api/partners/${id}`, partners);
    return data;
};

export const getAllPartners = async (page, limit = 3) => {
    const { data } = await $host.get('api/partners', { params: { page, limit } });
    return data.rows; // Извлекаем массив новостей из ответа сервера
  };