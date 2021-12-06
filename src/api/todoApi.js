import axiosClient from "./axiosClient";

const todoApi = {
    getAll: () => {
        const url = '/todoList';
        return axiosClient.get(url)
    },
    remove: (id) => {
        const url = `/todoList/${id}`;
        return axiosClient.delete(url, id)
    },
    edit: (data, id) => {
        const url = `/todoList/${id}`;
        return axiosClient.patch(url, data, id)
    },
    add: (data) => {
        const url = '/todoList';
        return axiosClient.post(url,data)
    }
}

export default todoApi;