import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { typingVariants, fadeIn } from "../animation/variants";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import {
    LayoutGrid,
    Users,
    FolderKanban,
    ImageIcon,
    CheckCircleIcon,
} from "lucide-react";

const Home = () => {
    const navigate = useNavigate();

    const statusColorMap = {
        Ongoing: "bg-blue-500",
        Completed: "bg-green-500",
        Pending: "bg-yellow-400",
    };


    const [stats, setStats] = useState({
        employees: 0,
        projects: 0,
        tasks: 0,
        posters: 0,
        projectsList: [],
        deadlines: [],
        statusStats: [],
        team: [],
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await axiosInstance.get("api/dashboard/data/");
                const data = res.data;

                setStats({
                    employees: data.counts?.employees || 0,
                    projects: data.counts?.projects || 0,
                    tasks: data.counts?.tasks || 0,
                    posters: data.counts?.posters || 0,
                    projectsList: data.projects || [],
                    deadlines: data.deadlines || [],
                    statusStats: data.statusStats || [],
                    team: data.team || [],
                });
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white relative pb-20">
            {/* Heading */}
            <div className="px-6 pt-10 pb-6 max-w-[1440px] mx-auto">
                <div className="flex items-center gap-3 pb-2">
                    <LayoutGrid className="w-8 h-8" />
                    <motion.h1
                        variants={typingVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl font-bold overflow-hidden whitespace-nowrap leading-tight"
                    >
                        Dashboard
                    </motion.h1>
                </div>

                <motion.p
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="text-gray-400 mt-4 text-sm max-w-xl"
                >
                    Watch on every activity, track progress, and projects — all in one control center.
                </motion.p>
            </div>

            {/* Counts Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-[1440px] mx-auto">
                <Card className="p-4 sm:p-5 flex flex-col items-center justify-center">
                    <Users className="w-6 h-6 mb-1" />
                    <p className="text-gray-400 text-xs sm:text-sm">Employees</p>
                    <p className="text-lg sm:text-xl font-bold">{stats.employees}</p>
                </Card>
                <Card className="p-4 sm:p-5 flex flex-col items-center justify-center">
                    <FolderKanban className="w-6 h-6 mb-1" />
                    <p className="text-gray-400 text-xs sm:text-sm">Projects</p>
                    <p className="text-lg sm:text-xl font-bold">{stats.projects}</p>
                </Card>
                <Card className="p-4 sm:p-5 flex flex-col items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 mb-1" />
                    <p className="text-gray-400 text-xs sm:text-sm">Completed tasks</p>
                    <p className="text-lg sm:text-xl font-bold">{stats.tasks}</p>
                </Card>
                <Card className="p-4 sm:p-5 flex flex-col items-center justify-center">
                    <ImageIcon className="w-6 h-6 mb-1" />
                    <p className="text-gray-400 text-xs sm:text-sm">Posters created</p>
                    <p className="text-lg sm:text-xl font-bold">{stats.posters}</p>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-12 max-w-[1440px] mx-auto">
                {/* Left Side */}
                <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8">
                    {/* Projects */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Your Projects</h3>
                            <Button onClick={() => navigate("/projects")}>View All</Button>
                        </div>
                        <div className="space-y-4">
                            {stats.projectsList.slice(0, 3).map((proj, i) => (
                                <div key={i} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{proj.title}</p>
                                    </div>
                                    <Badge>{proj.progress}%</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Upcoming Project Deadlines</h3>
                        <div className="space-y-3">
                            {stats.deadlines.length > 0 ? (
                                stats.deadlines.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex justify-between items-center p-3 rounded-lg ${item.status === "overdue" ? "bg-red-600/20" : "bg-white/10"
                                            }`}
                                    >
                                        <p className="font-medium">{item.project}</p>
                                        <p className={`text-sm ${item.status === "overdue" ? "text-red-400" : "text-gray-400"}`}>
                                            {item.due} {item.status === "overdue" ? "(Overdue)" : ""}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No upcoming deadlines</p>
                            )}
                        </div>
                    </Card>
                </motion.div>

                {/* Right Side */}
                <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8">
                    {/* Team */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Team</h3>
                            <Button variant="secondary" onClick={() => navigate("/employees")}>View Team</Button>
                        </div>
                        <div className="space-y-3">
                            {stats.team.map((member, i) => (
                                <div key={i} className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
                                    <p className="font-medium">{member.name}</p>
                                    <Badge>{member.role}</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Status */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Project Status</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {stats.statusStats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="bg-white/10 rounded-lg p-4 flex flex-col items-center justify-center text-center"
                                >
                                    {/* Dot + Label stacked */}
                                    <div className="flex flex-col items-center mb-2">
                                        <span
                                            className={`inline-block h-3 w-3 rounded-full ${statusColorMap[stat.label]} mb-1`}
                                        ></span>

                                        <p className="text-sm text-gray-300">{stat.label}</p>
                                    </div>

                                    {/* Count */}
                                    <p className="text-2xl font-bold">{stat.count}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
