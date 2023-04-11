import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://localhost:7091/",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: `bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
});

export default axiosClient;
