import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { typingVariants, fadeIn } from "../animation/variants";

const members = [
    { name: "Riya Sharma", role: "UI Designer", joined: "Mar 2023" },
    { name: "Jatin Mehta", role: "Frontend Dev", joined: "Feb 2024" },
    { name: "Priya Das", role: "Marketing Lead", joined: "Jan 2023" },
    { name: "Soham Jain", role: "Backend Dev", joined: "Aug 2024" },
    { name: "Alisha Gupta", role: "Sales Lead", joined: "May 2023" },
    { name: "Nikhil Rawat", role: "AI Ops", joined: "Jun 2024" },
    { name: "Meena Kapoor", role: "HR Manager", joined: "Jul 2022" },
    { name: "Devansh Solanki", role: "Business Dev", joined: "Dec 2023" },
];

const Team = () => {
    const [search, setSearch] = useState("");

    const filtered = members.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
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
                    className="bg-white/10 border border-white/20 px-4 py-2 text-sm rounded-md backdrop-blur placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition duration-200"
                />
            </motion.div>

            {/* Grid */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6"
            >
                {filtered.map((member, i) => (
                    <div
                        key={i}
                        className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-md transition-transform hover:scale-[1.01] duration-300"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-white/10 p-2 rounded-full">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{member.name}</h3>
                                <p className="text-sm text-gray-400">{member.role}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">Joined: {member.joined}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Team;
