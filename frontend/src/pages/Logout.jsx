import { logoutUser } from "../utils/logoutUser";
import { LogOut } from "lucide-react";
import Button from "../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const Logout = ({ closeModal }) => {
    const handleConfirm = () => {
        logoutUser();
        setTimeout(() => {
            closeModal();
            window.location.href = "/";
        }, 100);
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[999] flex items-center justify-center bg-white/15 backdrop-blur-[10px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.9,
                        y: 10,
                        transition: { duration: 0.2 },
                    }}
                    className="w-full max-w-sm px-6 py-7 rounded-2xl bg-black border border-white/20 
                     shadow-[0_40px_40px_rgba(0,0,0,0.5)] text-white text-center"
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="p-3 bg-red-500/10 text-red-500 rounded-full"
                        >
                            <LogOut size={28} />
                        </motion.div>

                        <motion.h3
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.3 }}
                            className="text-xl font-semibold tracking-tight"
                        >
                            Confirm Logout?
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18, duration: 0.3 }}
                            className="text-sm text-white/70"
                        >
                            Are you sure you want to log out now?
                        </motion.p>

                        <motion.div
                            className="mt-5 flex gap-3 w-full"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.10, duration: 0.3 }}
                        >
                            <Button variant="outline" onClick={closeModal} className="w-full">
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleConfirm} className="w-full">
                                Logout
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Logout;
