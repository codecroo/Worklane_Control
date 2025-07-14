export const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    console.log("Logged out"); // ✅ Check if this runs
};
