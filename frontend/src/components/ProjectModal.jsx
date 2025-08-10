// components/ProjectModal.jsx
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button";
import axiosInstance from "../utils/axiosInstance";

const MotionButton = motion.create(Button);

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

const ProjectModal = ({ onClose, onSubmit, editingProject }) => {
    const [formData, setFormData] = useState({
        name: "",
        deadline: "",
        employees: [],
    });
    const [employeesList, setEmployeesList] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axiosInstance.get("/api/employees/all/");
                setEmployeesList(res.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();

        if (editingProject) {
            setFormData({
                name: editingProject.name || "",
                deadline: editingProject.deadline || "",
                employees: editingProject.employees?.map((e) => e.id) || [],
            });
        }
    }, [editingProject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEmployeesChange = (e) => {
        setFormData({
            ...formData,
            employees: Array.from(e.target.selectedOptions, (option) => parseInt(option.value))
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

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
                        {editingProject ? "Edit Project" : "Add Project"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Project Name"
                            required
                            className="w-full bg-white/10 px-4 py-2 rounded-md border border-white/20 text-white placeholder:text-gray-400"
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={inputVariants}
                        />

                        <motion.input
                            name="deadline"
                            type="date"
                            value={formData.deadline}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/10 px-4 py-2 rounded-md border border-white/20 text-white placeholder:text-gray-400"
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={inputVariants}
                        />

                        <motion.select
                            multiple
                            value={formData.employees}
                            onChange={handleEmployeesChange}
                            className="w-full bg-white/10 px-4 py-2 rounded-md border border-white/20 text-white h-32"
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={inputVariants}
                        >
                            {employeesList.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.name}
                                </option>
                            ))}
                        </motion.select>

                        <MotionButton
                            type="submit"
                            className="w-full rounded-md text-white"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {editingProject ? "Update" : "Add"}
                        </MotionButton>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
