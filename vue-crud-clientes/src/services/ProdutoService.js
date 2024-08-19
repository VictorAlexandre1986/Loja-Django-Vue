import axios from 'axios';

const API_URL = 'http://localhost:8000/api/produtos/';

export default {
    getProdutos() {
        return axios.get(API_URL);
    },
    getProduto(id) {
        return axios.get(`${API_URL}${id}/`);
    },
    createProduto(produto) {
        return axios.post(API_URL, produto);
    },
    updateProduto(id, produto) {
        return axios.put(`${API_URL}${id}/`, produto);
    },
    deleteProduto(id) {
        return axios.delete(`${API_URL}${id}/`);
    }
};
