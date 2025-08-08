import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Pencil, Trash2, Plus } from "lucide-react";
import { typingVariants, fadeIn } from "../animation/variants";
import { Card } from "../components/ui/Card";
import axiosInstance from "../utils/axiosInstance"
import axios from "axios";


const API_BASE = "http://localhost:8000/api/employees"; // adjust as needed

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchEmployees = async () => {
        try {
            const response = await axiosInstance.get('api/employees/all/');

            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`${API_BASE}/${id}/`);
            setEmployees((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const filtered = employees.filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.position.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white relative pb-20 px-6 pt-10 max-w-[1440px] mx-auto">
            {/* Heading */}
            <motion.h1
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl font-bold inline-block overflow-hidden whitespace-nowrap leading-tight pb-2"
            >
                Employees
            </motion.h1>

            {/* Description + Search + Add Button */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex justify-between items-center mt-4 mb-8 flex-wrap gap-4"
            >
                <p className="text-sm text-gray-400 max-w-xl">
                    Manage all employees and assign them to different projects or teams.
                </p>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search employees..."
                        className="bg-white/10 border border-white/20 px-4 py-2 text-sm rounded-md backdrop-blur placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                    />
                    <button
                        onClick={() => alert("Show modal to add employee")}
                        className="bg-white/10 border border-white/20 px-4 py-2 rounded-md text-sm text-white flex items-center gap-2 hover:bg-white/20 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </motion.div>

            {/* Employees Grid */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6"
            >
                <AnimatePresence>
                    {filtered.map((employee) => (
                        <motion.div
                            key={employee.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <Card className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md h-full min-h-[200px] flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="bg-white/10 p-3 rounded-full">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{employee.name}</h3>
                                            <p className="text-sm text-gray-400">{employee.position}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">{employee.bio}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-gray-500">Joined: {employee.created_at}</p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => alert("Open edit modal")}
                                            className="hover:text-yellow-400 transition"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteEmployee(employee.id)}
                                            className="hover:text-red-500 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Employees;