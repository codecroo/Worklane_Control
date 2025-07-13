import { useEffect, useState } from "react";
import { refreshAccessToken } from "../utils/refreshAccessToken";

const useAuthCheck = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            console.log("Checking Auth...");
            const access = localStorage.getItem("access_token");

            if (access) {
                console.log("Access token found:", access);
                setIsAuthenticated(true);
                setLoading(false);
            } else {
                console.log("No access token. Trying refresh...");
                const newAccess = await refreshAccessToken();

                if (newAccess) {
                    console.log("Refreshed new access:", newAccess);
                    setIsAuthenticated(true);
                } else {
                    console.log("Failed to refresh token");
                    setIsAuthenticated(false);
                }

                setLoading(false); // ✅ Don't forget this
            }
        };

        checkAuth();
    }, []);

    return { loading, isAuthenticated };
};

export default useAuthCheck;
