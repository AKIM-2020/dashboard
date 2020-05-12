import axios from 'axios';
import { authenticationService } from "../service";

export const api = axios.create({
    headers: {
        'Authorization': `${authenticationService.currentUserValue.accessToken}`
    },
    responseType: "json"
});

api.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

api.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
})

export const getAdminRows = (data) => {
    return fakeApi(data)
};

const fakeApi = (data) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(data);
    } ,100)
});