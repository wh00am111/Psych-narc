import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createDocument = async (doc) => {
    const {data} = await $authHost.post('api/documents', doc)
    return data
}

export const fetchDocument = async (page, limit=3) => {
    const {data} = await $host.get('api/documents', {params: {
        page, limit
    }})
    return data
}

export const fetchOneDocument = async (doc) => {
    const { data } = await $host.get('api/documents', doc);
    return data.filePath; 
}

export const deleteDocuments = async (id) => {
    const {data} = await $authHost.delete('api/documents/' + id);
    return data;
};

export const updateDocuments = async (id, documents) => {
    const { data } = await $authHost.put(`api/documents/${id}`, documents);
    return data;
};

export const getAllDocuments = async (page, limit = 3) => {
    const { data } = await $host.get('api/documents', { params: { page, limit } });
    return data.rows; // Извлекаем массив новостей из ответа сервера
  };