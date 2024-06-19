import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createGallery = async (gallery) => {
    const {data} = await $authHost.post('api/gallery', gallery)
    return data
}

export const fetchGallery = async (page, limit=4) => {
    const {data} = await $host.get('api/gallery', {params: {
        page, limit
    }})
    return data
}

export const deleteGallery = async (id) => {
    const {data} = await $authHost.delete('api/gallery/' + id);
    return data;
};

export const updateGallery = async (id, gallery) => {
    const { data } = await $authHost.put(`api/gallery/${id}`, gallery);
    return data;
};

export const getAllGallery = async (page, limit = 3) => {
    const { data } = await $host.get('api/gallery', { params: { page, limit } });
    return data.rows; // Извлекаем массив новостей из ответа сервера
  };

export const fetchOneGallery = async (id) => {
    const {data} = await $host.get('api/gallery/' + id)
    return data
}