// Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import BottomNavbar from "../BotttomNavbar";
import { AnimatePresence, motion } from "framer-motion";

// Paths where BottomNavbar should NOT be shown
const hideNavbarOn = ["/", "/signin", "/signup"];

const Layout = () => {
    const location = useLocation();
    const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated route content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.06, ease: "easeInOut" }}
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>

            {/* Global Bottom Navbar */}
            {shouldShowNavbar && <BottomNavbar />}
        </div>
    );
};

export default Layout;