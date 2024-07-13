import axios from "axios"

export default {
    register: async function (data) {
        return await axios.post(import.meta.env.VITE_SERVER_HOST + "users", data)
    },
    findByUserName: async function (userName) {
        return await axios.get(import.meta.env.VITE_SERVER_HOST + `users` + `?userName=${userName}`)
    },
    addUser: async function (data) {
        return await axios.post(import.meta.env.VITE_SERVER_HOST + "users", data)
    },
    deleteUserById: async function (id) {
        return await axios.delete(import.meta.env.VITE_SERVER_HOST + "users/" + id)
    },

    // updateProduct: async function (data) {
    //     // if (!data.id) {
    //     //     throw new Error("Missing 'id' field in the product data");
    //     // }

    //     return await axios.put(import.meta.env.VITE_SERVER_HOST + "products/" + data.id, data);
    // },

    updateUser: async function (userId, newData) {
        return await axios.patch(
          import.meta.env.VITE_SERVER_HOST + `users/${userId}`, newData);
      },

}