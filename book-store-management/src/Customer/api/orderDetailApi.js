import axiosClient from "./axiosClient";

const orderDetailApi = {
    create(data) {
        const url = `OrderDetail/Create`;
        return axiosClient.post(url, data);
    },
};

export default orderDetailApi;
