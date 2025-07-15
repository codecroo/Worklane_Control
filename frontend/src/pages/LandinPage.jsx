import BG from "../assets/bg.png";
import Slide from "../components/ui/Slide";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardDescription, CardTitle } from "../components/ui/Card";
import { motion } from "framer-motion";
import Badge from "../components/ui/Badge";
import {
    Briefcase, Radar, FileImage,
    Megaphone,
    LineChart
} from "lucide-react";

const LandinPage = () => {
    return (
        <>
            <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar">
                <Navbar />
                <div className="scroll-smooth relative w-full bg-black text-white">
                    {/* Background */}
                    <div className="fixed inset-0 z-0">
                        <img
                            src={BG}
                            alt="bg"
                            loading="lazy"
                            className="w-full h-full object-cover opacity-30"
                        />
                    </div>

                    {/* Scrollable Content */}
                    <div className="relative z-10">
                        {/* Slide 1 - Hero */}
                        <Slide
                            id="home"
                            text="Built for Modern Teams"
                            sub="Worklane Control will handle your management and marketing chaos — with zero overhead."
                        >
                            <Badge className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-blue-200 text-sm font-medium rounded-full border border-white/20 backdrop-blur-md shadow-md">
                                <LineChart className="w-4 h-4 text-blue-300 animate-pulse" />
                                <div className="animate-pulse">Track • Predict • Win</div>
                            </Badge>
                        </Slide>

                        {/* Slide 2 - Features */}
                        <Slide id="features">
                            <div className="w-full max-w-6xl mx-auto px-4">
                                <motion.h2
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-center md:text-left"
                                >
                                    Built to Replace Your Stack
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-14 mx-auto md:mx-0 text-center md:text-left"
                                >
                                    Worklane Control gives you everything — from deadline tracking to automated marketing — all under one dashboard.
                                </motion.p>

                                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
                                    {/* Team & Project */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -80 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <Briefcase className="w-6 h-6 text-blue-300" />
                                            <h3 className="text-lg md:text-xl font-semibold text-white">Team & Project</h3>
                                        </div>
                                        <ul className="space-y-3 text-white/80 text-left text-sm font-medium">
                                            <li>• Project Tracking</li>
                                            <li>• Deadline Prediction</li>
                                            <li>• Team Coordination</li>
                                            <li>• KPI Dashboards</li>
                                        </ul>
                                    </motion.div>

                                    {/* Media */}
                                    <motion.div
                                        viewport={{ once: true }}
                                        initial={{ opacity: 0, x: 80 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <Megaphone className="w-6 h-6 text-pink-300" />
                                            <h3 className="text-lg md:text-xl font-semibold text-white">Media</h3>
                                        </div>
                                        <ul className="space-y-3 text-left text-white/80 text-sm font-medium">
                                            <li>• AI Poster Generation</li>
                                            <li>• Social Media Automation</li>
                                            <li>• Branding Templates</li>
                                            <li>• Campaign Notifications</li>
                                        </ul>
                                    </motion.div>
                                </div>
                            </div>
                        </Slide>

                        {/* Slide 3 - Problem/Solution */}
                        <Slide id="benefits">
                            <div className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-24">
                                {[
                                    {
                                        problem: "Endless meetings just to check progress.",
                                        solution: {
                                            icon: <Radar className="w-5 h-5 text-purple-300" />,
                                            title: "Live Status Sync",
                                            desc: "Everyone stays aligned in real time — no calls, no pings, just visibility.",
                                        },
                                    },
                                    {
                                        problem: "Designers are stuck making basic social posts daily.",
                                        solution: {
                                            icon: <FileImage className="w-5 h-5 text-yellow-300" />,
                                            title: "AI Poster Generator",
                                            desc: "Auto-create on-brand visuals in seconds. No bottlenecks, no delays.",
                                        },
                                    },
                                ].map((item, i) => {
                                    const isEven = i % 2 === 0;
                                    return (
                                        <div
                                            key={i}
                                            className="grid md:grid-cols-2 gap-10 items-start md:items-center"
                                        >
                                            {/* Problem */}
                                            <motion.div
                                                initial={{ opacity: 0, x: isEven ? -70 : 70 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.5 }}
                                                transition={{ duration: 0.7, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                                                className={`text-white/80 text-base sm:text-lg font-medium leading-relaxed ${isEven ? "text-left md:order-1" : "text-right md:order-2"}`}
                                            >
                                                <span className="inline-block bg-white/10 text-white/70 px-4 py-2 rounded-lg border border-white/10 shadow-sm">
                                                    ❌ {item.problem}
                                                </span>
                                            </motion.div>

                                            {/* Solution */}
                                            <motion.div
                                                initial={{ opacity: 0, x: isEven ? 70 : -70, scale: 0.95 }}
                                                viewport={{ once: true }}
                                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                                transition={{ duration: 0.7, delay: i * 0.2 + 0.15, ease: [0.22, 1, 0.36, 1] }}
                                                className={`${isEven ? "md:order-2" : "md:order-1"}`}
                                            >
                                                <Card className="p-4 hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 border-white/10 bg-white/5 backdrop-blur-md shadow-lg max-w-md mx-auto">
                                                    <CardHeader className="flex items-center gap-3 mb-1">
                                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
                                                            {item.solution.icon}
                                                        </div>
                                                        <CardTitle className="text-white text-sm md:text-base">{item.solution.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardDescription className="text-white/70 text-sm mt-1 pl-1 leading-normal">
                                                        {item.solution.desc}
                                                    </CardDescription>
                                                </Card>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Slide>
                    </div>
                </div>

            </main>
            <footer className="w-full bg-[#0a0a0a] text-white">
                <Footer />
            </footer>

        </>
    );
};

export default LandinPage;
