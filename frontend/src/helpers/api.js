import axios from 'axios';
import { tableData } from "../mocks/adminTableData.js";

export const api = axios.create({
    responseType: "json"
});

export const getAdminRows = (data) => {
    return fakeApi(data)
};

const fakeApi = (data) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(data);
    } ,5000)
});