import axiosClient from "./axiosClient";

const fieldApi = {
    async getAllField(params) {
        var qs = require("qs");
        const res = await axiosClient.get("Field/GetAll", {
            params: {
                ...params,
            },
            paramsSerializer: (params) => {
                //ví dụ với trường hợp size=[1,2] => &size=1&size=2
                return qs.stringify(params, { arrayFormat: "repeat" });
            },
        });
        return res;
    },

    async getById(id) {
        const url = `Field/GetById/${id}`;
        return axiosClient.get(url);
    },

    async get8Row() {
        const url = `Field/GetEightRow`;
        return axiosClient.get(url);
    },

    async get2Row() {
        const url = `Field/GetTwoRow`;
        return axiosClient.get(url);
    },
};

export default fieldApi;
