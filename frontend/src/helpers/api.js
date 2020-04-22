import axios from 'axios';

export const api = axios.create({
    responseType: "json"
});

export const getAdminRows = (data) => {
    return fakeApi(data)
};

const fakeApi = (data) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(data);
    } ,100)
});