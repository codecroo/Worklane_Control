import { useEffect, useState } from "react";
import { refreshAccessToken } from "../utils/auth";

const useAuthCheck = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const access = localStorage.getItem("access_token");
            if (access) {
                // Optional: Verify it's valid by pinging backend
                setIsAuthenticated(true);
            } else {
                const newAccess = await refreshAccessToken();
                if (newAccess) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    return { loading, isAuthenticated };
};

export default useAuthCheck;
