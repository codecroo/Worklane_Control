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
    CheckCircle2,
    Sparkles,
} from "lucide-react";

const Home = () => {
    const navigate = useNavigate();

    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        const fetchEmployeeCount = async () => {
            try {
                const res = await axiosInstance.get("api/employees/count/");
                setEmployeeCount(res.data.count);
            } catch (error) {
                console.error("Failed to fetch employee count:", error);
            }
        };

        fetchEmployeeCount();
    }, []);

    const projects = [
        { title: "Marketing Revamp", deadline: "2025-07-25", status: "Ongoing" },
        { title: "AI Poster Bot", deadline: "2025-08-05", status: "Pending" },
        { title: "Client Campaign", deadline: "2025-07-18", status: "Completed" },
    ];

    const team = [
        { name: "Riya", role: "Designer" },
        { name: "Jatin", role: "Dev" },
        { name: "Priya", role: "Marketing" },
    ];

    const deadlines = [
        { task: "Deliver hero poster", due: "July 16" },
        { task: "Schedule AI post", due: "July 18" },
    ];

    const posters = [
        { name: "Product Launch", created: "2 days ago", status: "Posted" },
        { name: "Hiring Banner", created: "1 day ago", status: "Scheduled" },
    ];

    const statusStats = [
        { label: "Ongoing", count: 2, color: "bg-blue-500" },
        { label: "Completed", count: 1, color: "bg-green-500" },
        { label: "Pending", count: 1, color: "bg-yellow-400" },
    ];

    return (
        <div className="min-h-screen bg-black text-white relative pb-20">
            {/* Heading */}
            <div className="px-6 pt-10 pb-6 max-w-[1440px] mx-auto">
                {/* Heading */}

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
                    Manage your Employees, Track progress, and watch Projects — all in one control center.
                </motion.p>
            </div>

            {/* Stats */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 px-6 max-w-screen-xl mx-auto mt-8"
            >

                {[
                    { Icon: Users, label: "Team Members", value: employeeCount },
                    { Icon: FolderKanban, label: "Total Projects", value: "7" },
                    { Icon: CheckCircle2, label: "Tasks Completed", value: "48" },
                    { Icon: Sparkles, label: "AI Posters Made", value: "19" },
                ].map(({ Icon, label, value }, i) => (
                    <Card key={i} className="bg-white/10 backdrop-blur p-4 rounded-xl">
                        <Icon className="w-5 h-5 mb-2 text-white" />
                        <p className="text-sm text-gray-400">{label}</p>
                        <p className="text-xl font-bold">{value}</p>
                    </Card>
                ))}
            </motion.div>

            {/* Main */}
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
                            {projects.map((proj, i) => (
                                <div key={i} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{proj.title}</p>
                                        <p className="text-xs text-gray-400">Deadline: {proj.deadline}</p>
                                    </div>
                                    <Badge>{proj.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Deadlines */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
                        <div className="space-y-3">
                            {deadlines.map((item, i) => (
                                <div key={i} className="flex justify-between items-center bg-white/10 p-3 rounded-lg">
                                    <p className="font-medium">{item.task}</p>
                                    <p className="text-sm text-gray-400">{item.due}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Status */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Project Status</h3>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4">
                            {statusStats.map((stat, i) => (
                                <div key={i} className="bg-white/10 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className={`h-2.5 w-2.5 rounded-full ${stat.color}`} />
                                        <p className="text-sm text-gray-300">{stat.label}</p>
                                    </div>
                                    <p className="text-2xl font-bold">{stat.count}</p>
                                </div>
                            ))}
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
                            {team.map((member, i) => (
                                <div key={i} className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
                                    <p className="font-medium">{member.name}</p>
                                    <Badge>{member.role}</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Posters */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Poster Activity</h3>
                        <div className="space-y-3">
                            {posters.map((poster, i) => (
                                <div key={i} className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{poster.name}</p>
                                        <p className="text-xs text-gray-400">Created: {poster.created}</p>
                                    </div>
                                    <Badge>{poster.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Button className="w-full">+ Add Project</Button>
                            <Button variant="secondary" className="w-full">Generate Poster</Button>
                            <Button variant="outline" className="w-full">Schedule Post</Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;