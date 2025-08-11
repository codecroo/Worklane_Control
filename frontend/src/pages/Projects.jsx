import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";
import { typingVariants, fadeIn } from "../animation/variants";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import ProjectModal from "../components/ProjectModal";
import axiosInstance from "../utils/axiosInstance";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // Fetch all projects
    const fetchProjects = async () => {
        try {
            const res = await axiosInstance.get("/api/projects/all/");
            setProjects(res.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleAdd = () => {
        setEditingProject(null);
        setIsModalOpen(true);
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleSave = async (formData) => {
        try {
            if (editingProject) {
                const res = await axiosInstance.put(`/api/projects/${editingProject.id}/`, formData);
                setProjects((prev) =>
                    prev.map((proj) =>
                        proj.id === editingProject.id
                            ? res.data.data || res.data
                            : proj
                    )
                );
            } else {
                console.log(formData);
                const res = await axiosInstance.post("/api/projects/add/", formData);
                setProjects((prev) => [res.data, ...prev]);
            }
            setIsModalOpen(false);
            setEditingProject(null);
        } catch (error) {
            console.error("Error saving project:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await axiosInstance.delete(`/api/projects/${id}/`);
            setProjects((prev) => prev.filter((proj) => proj.id !== id));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const filteredProjects = projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white relative pb-20 px-6 pt-10 max-w-[1440px] mx-auto">
            <motion.h1
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl font-bold inline-block overflow-hidden whitespace-nowrap leading-tight pb-2"
            >
                Projects
            </motion.h1>

            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex justify-between items-center mt-4 mb-8 flex-wrap gap-4"
            >
                <p className="text-sm text-gray-400 max-w-xl">
                    View and manage your ongoing projects, deadlines, and team assignments.
                </p>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search projects..."
                        className="bg-white/10 border border-white/20 px-4 py-2 text-sm rounded-md backdrop-blur placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                    />
                    <Button
                        onClick={handleAdd}
                        size="sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Project
                    </Button>
                </div>
            </motion.div>

            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <Card className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md h-full min-h-[200px] flex flex-col justify-between transition-colors duration-300">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-lg">{project.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="hover:text-indigo-500 transition"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="hover:text-red-500 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">
                                        Deadline: {project.deadline}
                                    </p>
                                    {project.employees?.length > 0 && (
                                        <p className="text-sm text-gray-400">
                                            Team: {project.employees.map((e) => e.name).join(", ")}
                                        </p>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {isModalOpen && (
                <ProjectModal
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingProject(null);
                    }}
                    onSubmit={handleSave}
                    editingProject={editingProject}
                />
            )}
        </div>
    );
};

export default Projects;