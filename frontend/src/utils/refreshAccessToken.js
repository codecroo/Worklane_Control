import axios from "axios";

export const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    if (!refresh_token) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await axios.post("http://localhost:8000/api/token/refresh/", {
            refresh: refresh_token,
        });

        const { access } = response.data;
        localStorage.setItem("access_token", access);
        return access;
    } catch (error) {
        console.error("Failed to refresh access token:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/signin"; // force re-login
        throw error;
    }
};
