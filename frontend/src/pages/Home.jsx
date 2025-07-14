import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BottomNavbar from "../components/BotttomNavbar";
import Logout from "./Logout";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import BG from "../assets/bg.png"
import {
    Users,
    FolderKanban,
    CheckCircle2,
    Sparkles,
} from "lucide-react";

const typingVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
        width: "auto",
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: "easeOut",
            delay: 0.3,
        },
    },
};

const fadeIn = {
    hidden: { opacity: 0, filter: "blur(4px)", y: 10 },
    visible: {
        opacity: 1,
        filter: "blur(0)",
        y: 0,
        transition: { duration: 0.6, delay: 0.6 },
    },
};

const Home = () => {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

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
        <div className="min-h-screen bg-black text-white relative">
            <div className={`transition-all duration-300 ${showLogout ? "blur-sm scale-[0.98]" : ""}`}>
                {/* Heading */}
                <div className="px-6 pt-10 pb-6 z-10">
                    <motion.h1
                        variants={typingVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl font-bold text-white inline-block overflow-hidden whitespace-nowrap"
                    >
                        Dashboard
                    </motion.h1>
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="text-gray-400 mt-4 text-sm max-w-xl"
                    >
                        Manage your operations, track progress, and automate marketing — all in one control center.
                    </motion.p>
                </div>

                {/* Worklane Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="mx-6 mt-10 mb-12 p-6">
                        <h3 className="text-xl font-semibold mb-6">Worklane Overview</h3>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
                            {[
                                { Icon: Users, label: "Team Members", value: "12" },
                                { Icon: FolderKanban, label: "Total Projects", value: "7" },
                                { Icon: CheckCircle2, label: "Tasks Completed", value: "48" },
                                { Icon: Sparkles, label: "AI Posters Made", value: "19" },
                            ].map(({ Icon, label, value }, i) => (
                                <div
                                    key={i}
                                    className="bg-white/10 rounded-2xl p-4 flex flex-col justify-center backdrop-blur"
                                >
                                    <Icon className="w-6 h-6 text-white mb-2" />
                                    <p className="text-sm text-gray-400">{label}</p>
                                    <p className="text-xl font-bold text-white">{value}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid px-6 pb-32 gap-10 grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
                    {/* Left Column */}
                    <div className="space-y-10">
                        {/* Projects */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold">Your Projects</h3>
                                    <Button onClick={() => navigate("/projects")}>View All</Button>
                                </div>
                                <div className="space-y-4">
                                    {projects.map((proj, i) => (
                                        <Card key={i} className="bg-white/10 p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium">{proj.title}</p>
                                                    <p className="text-xs text-gray-400">
                                                        Deadline: {proj.deadline}
                                                    </p>
                                                </div>
                                                <Badge>{proj.status}</Badge>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Deadlines */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Upcoming Deadlines</h3>
                                <div className="space-y-4">
                                    {deadlines.map((item, i) => (
                                        <Card key={i} className="bg-white/10 p-4">
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium">{item.task}</p>
                                                <p className="text-sm text-gray-400">{item.due}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Project Status</h3>
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
                                    {statusStats.map((stat, i) => (
                                        <div
                                            key={i}
                                            className="bg-white/10 rounded-xl p-4 flex flex-col justify-center items-start backdrop-blur"
                                        >
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className={`h-2.5 w-2.5 rounded-full ${stat.color}`}></span>
                                                <p className="text-sm text-gray-300">{stat.label}</p>
                                            </div>
                                            <p className="text-2xl font-bold text-white">{stat.count}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-10">
                        {/* Team */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold">Team</h3>
                                    <Button variant="secondary" onClick={() => navigate("/team")}>
                                        View Team
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {team.map((member, i) => (
                                        <Card key={i} className="bg-white/10 p-4">
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium">{member.name}</p>
                                                <Badge>{member.role}</Badge>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Poster Activity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Poster Activity</h3>
                                <div className="space-y-4">
                                    {posters.map((poster, i) => (
                                        <Card key={i} className="bg-white/10 p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium">{poster.name}</p>
                                                    <p className="text-xs text-gray-400">
                                                        Created: {poster.created}
                                                    </p>
                                                </div>
                                                <Badge>{poster.status}</Badge>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                                <div className="flex flex-wrap gap-4">
                                    <Button className="flex-1">+ Add Project</Button>
                                    <Button variant="secondary" className="flex-1">Generate Poster</Button>
                                    <Button variant="outline" className="flex-1">Schedule Post</Button>
                                </div>
                            </Card>
                        </motion.div>

                        {/* ✅ Project Status - INSIDE GRID */}

                    </div>
                </div>

                <BottomNavbar onLogoutClick={() => setShowLogout(true)} />
            </div>

            {showLogout && <Logout closeModal={() => setShowLogout(false)} />}
        </div>
    );
};

export default Home;
