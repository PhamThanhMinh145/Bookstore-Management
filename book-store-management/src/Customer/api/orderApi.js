import axiosClient from "./axiosClient";

const orderApi = {
    create(data) {
        const url = `Order/Create/${data}`;
        return axiosClient.post(url);
    },

    getByCustomerId(data) {
        const url = `Order/GetByCustomerId/${data}`;
        return axiosClient.get(url);
    },

    getOrderDetailByOrderId(data) {
        const url = `Order/GetByOrderId/${data}`;
        return axiosClient.get(url);
    },

    updateStatus(data, body) {
        const url = `Order/UpdateStatus/${data}`;
        return axiosClient.put(url, body);
    },
};

export default orderApi;
