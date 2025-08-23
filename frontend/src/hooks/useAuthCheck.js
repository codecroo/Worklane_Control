import { useEffect, useState } from "react";
import { isTokenValid } from "../utils/tokenUtils";
import { refreshAccessToken } from "../utils/refreshAccessToken";

const useAuthCheck = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const access = localStorage.getItem("access_token");

            if (access && isTokenValid(access)) {
                setIsAuthenticated(true);
            } else {
                const newAccess = await refreshAccessToken();
                setIsAuthenticated(!!newAccess);
            }

            setLoading(false);
        };
        checkAuth();
    }, []);

    return { loading, isAuthenticated };
};

export default useAuthCheck;