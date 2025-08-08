// components/EmployeeModal.jsx
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modal = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 25,
            duration: 0.4
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: -20,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    },
};

const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * i,
            duration: 0.25
        }
    })
};

const EmployeeModal = ({ onClose, onSubmit, editingEmployee }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        position: "",
        department: "",
        bio: "",
    });

    useEffect(() => {
        if (editingEmployee) {
            setFormData({
                name: editingEmployee.name || "",
                email: editingEmployee.email || "",
                position: editingEmployee.position || "",
                department: editingEmployee.department || "",
                bio: editingEmployee.bio || "",
            });
        }
    }, [editingEmployee]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const fields = [
        { name: "name", placeholder: "Name", type: "text", required: true },
        { name: "email", placeholder: "Email", type: "email", required: true },
        { name: "position", placeholder: "Position", type: "text", required: true },
        { name: "department", placeholder: "Department", type: "text", required: true }
    ];

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.div
                    className="bg-zinc-900 border border-white/10 p-6 rounded-xl w-full max-w-md relative"
                    variants={modal}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                    >
                        <X />
                    </button>
                    <h2 className="text-xl font-semibold mb-6">
                        {editingEmployee ? "Edit Employee" : "Add Employee"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.map((field, i) => (
                            <motion.input
                                key={field.name}
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                required={field.required}
                                className="w-full bg-white/10 px-4 py-2 rounded-md border border-white/20 text-white placeholder:text-gray-400"
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={inputVariants}
                            />
                        ))}
                        <motion.textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Short Bio"
                            className="w-full bg-white/10 px-4 py-2 rounded-md border border-white/20 text-white placeholder:text-gray-400"
                            rows={4}
                            custom={fields.length}
                            initial="hidden"
                            animate="visible"
                            variants={inputVariants}
                        />
                        <motion.button
                            type="submit"
                            className="w-full bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-md text-white"
                            custom={fields.length + 1}
                            initial="hidden"
                            animate="visible"
                            variants={inputVariants}
                        >
                            {editingEmployee ? "Update" : "Add"}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EmployeeModal;