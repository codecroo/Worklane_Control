import { useEffect, useState } from "react";
import { X, Calendar, Users, FileText } from "lucide-react";
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
            duration: 0.4,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: -20,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
};

const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * i,
            duration: 0.25,
        },
    }),
};

const ProjectModal = ({ onClose, onSubmit, editingProject }) => {
    const [formData, setFormData] = useState({
        name: "",
        deadline: "",
        employees: [],
        tasks: [],
    });
    const [employeesList, setEmployeesList] = useState([]);
    const [newTask, setNewTask] = useState("");

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
                tasks:
                    editingProject.tasks?.map((t) =>
                        typeof t === "string"
                            ? { name: t, is_completed: false }
                            : { name: t.name, is_completed: !!t.is_completed }
                    ) || [],
            });
        }
    }, [editingProject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEmployee = (id) => {
        setFormData((prev) => {
            const exists = prev.employees.includes(id);
            return {
                ...prev,
                employees: exists
                    ? prev.employees.filter((eid) => eid !== id)
                    : [...prev.employees, id],
            };
        });
    };

    const addTask = () => {
        const trimmed = newTask.trim();
        if (trimmed && !formData.tasks.some((t) => t.name === trimmed)) {
            setFormData((prev) => ({
                ...prev,
                tasks: [...prev.tasks, { name: trimmed, is_completed: false }],
            }));
            setNewTask("");
        }
    };

    const removeTask = (taskName) => {
        setFormData((prev) => ({
            ...prev,
            tasks: prev.tasks.filter((t) => t.name !== taskName),
        }));
    };

    const toggleTaskCompleted = (taskName) => {
        setFormData((prev) => ({
            ...prev,
            tasks: prev.tasks.map((t) =>
                t.name === taskName ? { ...t, is_completed: !t.is_completed } : t
            ),
        }));
    };

    const handleTaskKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTask();
        }
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
                        aria-label="Close modal"
                    >
                        <X />
                    </button>

                    <h2 className="text-xl font-semibold mb-6">
                        {editingProject ? "Edit Project" : "Add Project"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Project Name */}
                        <motion.div
                            className="relative w-full custom-0"
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={inputVariants}
                        >
                            <FileText
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"
                            />
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Project Name"
                                required
                                className="w-full bg-white/10 pl-9 py-2 rounded-md border border-white/20 text-white placeholder:text-gray-300"
                            />
                        </motion.div>

                        {/* Deadline */}
                        <label htmlFor="deadline" className="block mb-1 text-gray-300">
                            Deadline
                        </label>
                        <motion.div
                            className="relative w-full custom-1"
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={inputVariants}
                        >
                            <Calendar
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"
                            />
                            <input
                                id="deadline"
                                name="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/10 pl-9 py-2 rounded-md border border-white/20 text-white"
                            />
                        </motion.div>

                        {/* Employees */}
                        <motion.div
                            className="flex flex-col"
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={inputVariants}
                        >
                            <div className="flex items-center gap-2 mb-2 text-white select-none">
                                <Users size={16} className="text-indigo-400" />
                                <span className="font-medium">Select Team Members</span>
                            </div>
                            <div className="w-full bg-white/10 p-3 rounded-md border border-white/20 max-h-40 overflow-y-auto flex flex-wrap gap-2 text-white">
                                {employeesList.map((emp) => {
                                    const isSelected = formData.employees.includes(emp.id);
                                    return (
                                        <motion.button
                                            key={emp.id}
                                            type="button"
                                            onClick={() => toggleEmployee(emp.id)}
                                            initial={false}
                                            animate={{
                                                backgroundColor: isSelected
                                                    ? "rgba(90, 120, 230, 0.35)"
                                                    : "rgba(90, 120, 230, 0)",
                                                color: isSelected ? "#F0F4FF" : "#A8B2C9",
                                                scale: isSelected ? 1.04 : 1,
                                                boxShadow: isSelected
                                                    ? "0 0 100px 15px rgba(110, 110, 110, 0.45)"
                                                    : "none",
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="px-3 py-1 rounded-full border border-white/30 cursor-pointer text-sm select-none"
                                        >
                                            {emp.name}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Tasks */}
                        <motion.div
                            className="relative w-full"
                            custom={3}
                            initial="hidden"
                            animate="visible"
                            variants={inputVariants}
                        >
                            <label className="block mb-1 text-gray-300">Tasks</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    onKeyDown={handleTaskKeyDown}
                                    placeholder="Type a task and press Enter"
                                    className="flex-grow bg-white/10 py-2 px-3 rounded-md border border-white/20 text-white placeholder:text-gray-300"
                                />
                                <Button size="sm" type="button" onClick={addTask}>
                                    Add
                                </Button>
                            </div>
                            <div className="mt-2 flex flex-col gap-2">
                                {formData.tasks.map((task, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between bg-blue-500/10 text-white border border-blue-300/30 rounded-md px-3 py-2 text-sm select-none"
                                    >
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={task.is_completed}
                                                onChange={() => toggleTaskCompleted(task.name)}
                                                className="accent-indigo-500 cursor-pointer"
                                            />
                                            <span
                                                className={task.is_completed ? "line-through text-gray-400" : ""}
                                            >
                                                {task.name}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeTask(task.name)}
                                            className="hover:text-indigo-300 transition"
                                            aria-label={`Remove task ${task.name}`}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

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
