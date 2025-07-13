import axios from "axios";
import { refreshAccessToken } from "./refreshAccessToken";

const authAxios = axios.create();

authAxios.interceptors.request.use(async (config) => {
    let accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        accessToken = await refreshAccessToken();
    }

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export default authAxios;
