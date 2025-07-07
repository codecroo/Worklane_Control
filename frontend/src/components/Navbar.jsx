import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";
import { Link } from "react-router-dom";

const navLinks = ["home", "features", "benefits"];

const Navbar = () => {
    const [active, setActive] = useState("home");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.6,
            }
        );

        navLinks.forEach((link) => {
            const el = document.getElementById(link);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleNavClick = (link) => {
        const el = document.getElementById(link);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-white/10 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

                {/* LOGO */}
                <motion.div
                    onClick={() => handleNavClick("home")}
                    className="cursor-pointer text-white text-xl sm:text-2xl font-extrabold tracking-wide"
                >
                    Worklane{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff84] to-[#ffffffb5]">
                        Control
                    </span>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 relative">
                    {navLinks.map((link) => (
                        <button
                            key={link}
                            onClick={() => handleNavClick(link)}
                            className={`relative text-sm font-medium transition-colors duration-300 cursor-pointer ${active === link ? "text-blue-300" : "text-white/70 hover:text-white"
                                }`}
                        >
                            {link.charAt(0).toUpperCase() + link.slice(1)}
                            {active === link && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex gap-3">
                    <Link to="/signin">
                        <Button variant="outline" size="sm">Sign In</Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant="primary" size="sm">Sign Up</Button>
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="md:hidden overflow-hidden px-6 pb-4"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link}
                                    onClick={() => handleNavClick(link)}
                                    className={`text-left text-sm font-medium transition-colors duration-300 ${active === link ? "text-blue-300" : "text-white/70 hover:text-white"
                                        }`}
                                >
                                    {link.charAt(0).toUpperCase() + link.slice(1)}
                                </button>
                            ))}
                            <div className="flex flex-col gap-2 pt-2">
                                <Link to="/SignIn">
                                    <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                                </Link>
                                <Link to="/SignUp">
                                    <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
