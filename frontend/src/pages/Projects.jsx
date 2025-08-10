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

    // Add / Edit Project
    const handleSave = async (formData) => {
        try {
            if (editingProject) {
                await axiosInstance.put(`/api/projects/${editingProject.id}/`, formData);
            } else {
                await axiosInstance.post("/api/projects/add/", formData);
            }
            fetchProjects();
            setIsModalOpen(false);
            setEditingProject(null);
        } catch (error) {
            console.error("Error saving project:", error);
        }
    };

    // Delete Project
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await axiosInstance.delete(`/api/projects/${id}/`);
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    // Filtered Projects
    const filteredProjects = projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
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
                            placeholder="Search employees..."
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

                {/* Project Cards */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                            >
                                <Card className="p-4 flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-semibold">{project.name}</h2>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(project)}
                                            >
                                                <Pencil className="text-blue-500" size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(project.id)}>
                                                <Trash2 className="text-red-500" size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Deadline: {project.deadline}
                                    </p>
                                    {project.employees?.length > 0 && (
                                        <p className="text-sm">
                                            Team:{" "}
                                            {project.employees.map((e) => e.name).join(", ")}
                                        </p>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Modal */}
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
            </div >
        </>
    );
};

export default Projects;







// <div className="min-h-screen bg-black text-white pb-24 px-6 pt-10 max-w-[1440px] mx-auto">
//     {/* Heading */}
//     <motion.h1
//         variants={typingVariants}
//         initial="hidden"
//         animate="visible"
//         className="text-4xl font-bold inline-block overflow-hidden whitespace-nowrap leading-tight pb-2"
//     >
//         Projects
//     </motion.h1>

//     {/* Subtext and Search */}
//     <motion.div
//         variants={fadeIn}
//         initial="hidden"
//         animate="visible"
//         className="flex justify-between items-center mt-4 mb-8 flex-wrap gap-4"
//     >
//         <p className="text-sm text-gray-400">
//             View and manage your ongoing projects, deadlines, and team assignments.
//         </p>

//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             className="relative"
//         >
//             <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
//             <input
//                 type="text"
//                 placeholder="Search projects..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="bg-white/5 backdrop-blur border border-white/20 px-8 py-2 text-sm rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 min-w-[220px]"
//             />
//         </motion.div>
//     </motion.div> 