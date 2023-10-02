import axios from "axios"

export default {
    findAll: async function () {
        return await axios.get(import.meta.env.VITE_SERVER_HOST + "products")
    },
    deleteById: async function (id) {
        return await axios.delete(import.meta.env.VITE_SERVER_HOST + "products/" + id)
    },
    addProduct: async function (data) {
        return await axios.post(import.meta.env.VITE_SERVER_HOST + "products", data)
    },
    updateProduct: async function (data) {
        // if (!data.id) {
        //     throw new Error("Missing 'id' field in the product data");
        // }

        return await axios.put(import.meta.env.VITE_SERVER_HOST + "products/" + data.id, data);
    },
}