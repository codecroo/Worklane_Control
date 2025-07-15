import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";
import { typingVariants, fadeIn } from "../animation/variants";
import { Card } from "../components/ui/Card";

const members = [
    { name: "Riya Sharma", role: "UI Designer", joined: "Mar 2023", bio: "Designs clean, user-centric interfaces." },
    { name: "Jatin Mehta", role: "Frontend Dev", joined: "Feb 2024", bio: "Builds fast, accessible web apps." },
    { name: "Priya Das", role: "Marketing Lead", joined: "Jan 2023", bio: "Leads campaigns with great insight." },
    { name: "Soham Jain", role: "Backend Dev", joined: "Aug 2024", bio: "Handles data flow and APIs." },
    { name: "Alisha Gupta", role: "Sales Lead", joined: "May 2023", bio: "Drives business through strategy." },
    { name: "Nikhil Rawat", role: "AI Ops", joined: "Jun 2024", bio: "Automates operations using AI tools." },
    { name: "Meena Kapoor", role: "HR Manager", joined: "Jul 2022", bio: "Maintains healthy team dynamics." },
    { name: "Devansh Solanki", role: "Business Dev", joined: "Dec 2023", bio: "Scales partnerships and outreach." },
];

const Team = () => {
    const [search, setSearch] = useState("");

    const filtered = members.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white relative pb-20 px-6 pt-10 max-w-[1440px] mx-auto">
            {/* Heading */}
            <motion.h1
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl font-bold inline-block overflow-hidden whitespace-nowrap"
            >
                Team
            </motion.h1>

            {/* Description + Search */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex justify-between items-center mt-4 mb-8 flex-wrap gap-4"
            >
                <p className="text-sm text-gray-400 max-w-xl">
                    Meet your collaborators and manage your internal team structure.
                </p>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search team..."
                    className="bg-white/10 border border-white/20 px-4 py-2 text-sm rounded-md backdrop-blur placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                />
            </motion.div>

            {/* Grid */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6"
            >
                <AnimatePresence>
                    {filtered.map((member, i) => (
                        <motion.div
                            key={i}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-transform hover:scale-[1.01] duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-white/10 p-3 rounded-full">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{member.name}</h3>
                                        <p className="text-sm text-gray-400">{member.role}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300 mb-2">{member.bio}</p>
                                <p className="text-xs text-gray-500">Joined: {member.joined}</p>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Team;
