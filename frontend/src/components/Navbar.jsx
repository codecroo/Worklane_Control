// Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";
import { Link } from "react-router-dom";

const NAV = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "guide", label: "Guide" },
];

export default function Navbar() {
    const [active, setActive] = useState("home");
    const [open, setOpen] = useState(false);
    const headerRef = useRef(null);

    // tune this to match your header visual size
    const HEADER_HEIGHT = 60;

    // --- Scroll spy (simple & lightweight) ---
    useEffect(() => {
        const onScroll = () => {
            if (open) return; // don't update while menu is open
            const mid = window.scrollY + window.innerHeight / 2;
            let current = NAV[0].id;
            for (const n of NAV) {
                const el = document.getElementById(n.id);
                if (el && el.offsetTop <= mid) current = n.id;
            }
            setActive(current);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // initialize
        return () => window.removeEventListener("scroll", onScroll);
    }, [open]);

    // --- Body scroll lock (simple) ---
    useEffect(() => {
        const prev = document.body.style.overflow;
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = prev || "";
        return () => (document.body.style.overflow = prev || "");
    }, [open]);

    // --- Close on Escape (simple) ---
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape" && open) setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    // Smooth scroll accounting for fixed header
    const goTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const headerH = headerRef.current?.offsetHeight ?? HEADER_HEIGHT;
            const top = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
            window.scrollTo({ top, behavior: "smooth" });
        }
        setOpen(false);
    };

    // Mobile panel (simple portal + motion)
    const MobilePanel = () => {
        if (typeof document === "undefined") return null;
        return createPortal(
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ zIndex: 99999 }}
                        className="fixed inset-0 bg-black/40"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ y: -18, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -18, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 320, damping: 28, duration: 0.26 }}
                            className="mx-auto mt-4 max-w-md w-[92%] rounded-lg bg-[#0b0b0b]/95 border border-white/8 shadow-xl p-5"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-white text-lg font-semibold">Menu</div>
                                <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-white p-1 rounded hover:bg-white/5">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-1">
                                {NAV.map((item) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => goTo(item.id)}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.12 }}
                                        className={`text-left py-3 px-2 rounded-md text-base font-medium focus:outline-none ${active === item.id ? "text-blue-300" : "text-white/70 hover:text-white"
                                            }`}
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                            </nav>

                            <div className="mt-4 flex flex-col gap-3">
                                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.12 }}>
                                    <Link to="/signin" onClick={() => setOpen(false)}>
                                        <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.12 }}>
                                    <Link to="/signup" onClick={() => setOpen(false)}>
                                        <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>,
            document.body
        );
    };

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-sm border-b border-white/8"
                style={{ height: HEADER_HEIGHT }}
            >
                <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Bigger logo */}
                    <div onClick={() => goTo("home")} className="cursor-pointer text-white text-3xl sm:text-2xl font-extrabold">
                        Worklane <span className="text-blue-300">Control</span>
                    </div>

                    {/* Center nav links */}
                    <nav className="hidden md:flex gap-6 items-center absolute left-1/2 -translate-x-1/2">
                        {NAV.map((n) => (
                            <motion.button
                                key={n.id}
                                onClick={() => goTo(n.id)}
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.12 }}
                                className={`relative text-sm font-medium transition-colors px-1 ${active === n.id ? "text-blue-300" : "text-white/60 hover:text-white"
                                    }`}
                                aria-current={active === n.id ? "page" : undefined}
                            >
                                {n.label}
                                <span
                                    className={`block h-[1.5px] rounded-full mt-1 transition-all duration-150 ${active === n.id ? "bg-blue-300 w-full" : "bg-transparent w-0"
                                        }`}
                                />
                            </motion.button>
                        ))}
                    </nav>

                    {/* Auth + mobile toggle */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex gap-2">
                            <Link to="/signin"><Button variant="outline" size="sm">Sign In</Button></Link>
                            <Link to="/signup"><Button variant="primary" size="sm">Sign Up</Button></Link>
                        </div>

                        <button className="md:hidden text-white p-2 rounded hover:bg-white/5" onClick={() => setOpen((s) => !s)} aria-expanded={open} aria-label="Toggle menu">
                            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {open && <MobilePanel />}
        </>
    );
}
