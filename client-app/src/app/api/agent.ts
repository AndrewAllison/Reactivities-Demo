import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.response.use(undefined, error => {
    console.log(error);
    if (error.message === 'Network Error') {
        toast.error('Network Connectivity issues.');
    }
    const { status, data, config } = error.response;

    if (error.response.status === 404) {
        history.push('/notfound');
    }
    if (
        status === 400 &&
        config.method === 'get' &&
        Object.prototype.hasOwnProperty.call(data.errors, 'id')
    ) {
        history.push('/notfound');
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for more info!');
    }
});

const responseBody = (response: AxiosResponse) => response.data || null;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve =>
        setTimeout(() => resolve(response), ms)
    );

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) =>
        axios
            .delete(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {}
            })
            .then(responseBody)
};

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post(`/activities`, activity),
    update: (activity: IActivity) =>
        requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
};

export default { Activities };
