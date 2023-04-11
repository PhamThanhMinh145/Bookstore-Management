import axiosClient from "./axiosClient";

const authApi = {
    verifyAccessToken(token) {
        const url = `Auth/verify-access-token/${token}`;
        return axiosClient.post(url);
    },
};

export default authApi;
