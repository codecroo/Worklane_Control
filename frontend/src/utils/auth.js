import axios from "axios";

export const refreshAccessToken = async () => {
    try {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) return null;

        const res = await axios.post("http://localhost:8000/api/token/refresh/", {
            refresh,
        });

        localStorage.setItem("access_token", res.data.access);
        return res.data.access;
    } catch (err) {
        console.error("Failed to refresh access token", err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return null;
    }
};
