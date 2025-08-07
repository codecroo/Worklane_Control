import {
    LogOut,
    Sparkles,
    UsersIcon,
    LayoutGrid,
    FolderKanban,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Logout from "../pages/Logout"; // Modal

const navItems = [
    { label: "Dashboard", icon: LayoutGrid, path: "/dashboard" }, // ✅ fixed path
    { label: "Employees", icon: UsersIcon, path: "/employees" },
    { label: "Projects", icon: FolderKanban, path: "/projects" },
    { label: "Marketing", icon: Sparkles, path: "/marketing" },
    { label: "Logout", icon: LogOut, path: "/logout" }, // UI only
];

const BottomNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const active = location.pathname; // ✅ real-time route

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showLogout, setShowLogout] = useState(false);

    const handleClick = (path, label) => {
        if (label === "Logout") return setShowLogout(true);
        navigate(path);
    };

    const getPaddingClass = (index) => {
        if (hoveredIndex === index) return "px-4 py-3";
        if (hoveredIndex === index - 1 || hoveredIndex === index + 1)
            return "px-3.5 py-3";
        return "px-3 py-3";
    };

    const navbarWidths = [
        "w-[265px]", "w-[285px]", "w-[295px]", "w-[285px]", "w-[265px]",
    ];
    const dynamicWidth =
        hoveredIndex !== null ? navbarWidths[hoveredIndex] : "w-[265px]";

    return (
        <>
            <div className="fixed bottom-0 left-0 w-full z-[45] pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/70 to-transparent z-[-1]" />
                <div
                    className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-50
                        max-sm:w-full max-sm:px-4 max-sm:bottom-3 pointer-events-auto`}
                >
                    <div
                        className={`flex items-center justify-center gap-1
                        px-2 py-1 rounded-full
                        bg-black/35 backdrop-blur-md border border-white/20
                        shadow-[0_10px_20px_rgba(0,0,0,0.5)]
                        transition-all duration-400 ease-[cubic-bezier(0.25,0.4,0.,1)]
                        ${dynamicWidth} 
                        max-sm:w-full max-sm:!max-w-full max-sm:!px-1 max-sm:gap-0.5`}
                    >
                        {navItems.map((item, index) => {
                            const isActive = active === item.path;
                            const Icon = item.icon;
                            const paddingClass = getPaddingClass(index);

                            return (
                                <div
                                    key={item.path}
                                    onClick={() => handleClick(item.path, item.label)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={`group relative cursor-pointer rounded-full 
                                        flex items-center justify-center ${paddingClass}
                                        transition-all duration-400 ease-in-out transform-gpu
                                        ${isActive
                                            ? "bg-white/10 scale-[0.97] shadow-inner ring-0.5 ring-white/20"
                                            : "hover:bg-white/10 hover:scale-[0.90] hover:px-4 hover:mx-1 active:scale-[0.98]"}
                                        max-sm:px-3 max-sm:py-2 max-sm:mx-0.5 max-sm:rounded-xl`}
                                >
                                    {isActive && (
                                        <div className="absolute inset-2 rounded bg-white/10 blur-sm pointer-events-none" />
                                    )}

                                    <Icon
                                        size={16}
                                        className="text-white z-100 transition-transform duration-300 max-sm:size-[16px]"
                                    />

                                    <div
                                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2
                                        bg-black/100 text-white text-[13px] font-medium px-3 py-1.5
                                        rounded-md backdrop-blur-md border border-white/20
                                        opacity-0 scale-90 translate-y-1 pointer-events-none
                                        group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                                        transition-all duration-300 ease-in-out shadow-[0_4px_20px_rgba(255,255,255,0.1)]
                                        z-30 max-sm:text-[10px] max-sm:px-2"
                                    >
                                        {item.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Logout Modal */}
            {showLogout && <Logout closeModal={() => setShowLogout(false)} />}
        </>
    );
};

export default BottomNavbar;
