import BG from "../assets/bg.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import {
    Briefcase,
    Megaphone,
    LineChart,
    BookOpen,
    CheckCircle2,
    MousePointer,
    Settings,
    LayoutDashboardIcon,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
    viewport: { once: true },
});

const LandingPage = () => {
    return (
        <>
            <Navbar />

            <main
                className="relative w-full text-white snap-y snap-mandatory scroll-smooth bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${BG})` }}
            >
                {/* Hero */}
                <section
                    id="home"
                    className="min-h-screen bg-black/50 snap-start flex flex-col justify-center items-center text-center px-4 scroll-mt-20"
                >
                    <motion.h1
                        {...fadeUp(0)}
                        className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6"
                    >
                        Built for Modern Teams
                    </motion.h1>

                    <motion.p
                        {...fadeUp(0.2)}
                        className="max-w-xl text-white/70 text-base sm:text-lg md:text-xl mb-6"
                    >
                        Worklane Control will handle your management and marketing chaos -
                        with zero overhead.
                    </motion.p>

                    <motion.div {...fadeUp(0.4)}>
                        <Badge className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-blue-200 text-sm font-medium rounded-full border border-white/20 backdrop-blur-md shadow-md transition-all duration-300 hover:border-white/30">
                            <LineChart className="w-4 h-4 text-blue-300" />
                            <div>Track • Manage • Win</div>
                        </Badge>
                    </motion.div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    className="min-h-screen bg-black/50 snap-start flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-20 scroll-mt-20"
                >
                    <div className="w-full max-w-6xl mx-auto text-center">
                        <motion.h1
                            {...fadeUp(0)}
                            className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6"
                        >
                            Replace Your Stack
                        </motion.h1>

                        <motion.p
                            {...fadeUp(0.2)}
                            className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-14 mx-auto"
                        >
                            Everything you need from managing projects to
                            managing marketing under one dashboard.
                        </motion.p>

                        <div className="grid grid-cols-1 text-left sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <LayoutDashboardIcon className="w-6 h-6 text-green-300" />,
                                    title: "Dashboard",
                                    items: [
                                        "Real-time deadline tracking",
                                        "Task count overview",
                                        "Live project status updates",
                                        "Monitor ongoing, pending & completed projects",
                                    ],
                                },
                                {
                                    icon: <Briefcase className="w-6 h-6 text-blue-300" />,
                                    title: "Team & Project",
                                    items: [
                                        "Project & employee management",
                                        "Assign members to specific projects",
                                        "Integrated GitHub task tracking",
                                        "Seamless management experience",
                                    ],
                                },
                                {
                                    icon: <Megaphone className="w-6 h-6 text-pink-300" />,
                                    title: "Media",
                                    items: [
                                        "AI-powered poster generation",
                                        "One-click social media posting",
                                        "Instagram",
                                        "Facebook",
                                    ],
                                },

                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeUp(i * 0.1)}
                                    className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-md 
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-white/20"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        {feature.icon}
                                        <h3 className="text-lg font-semibold text-white">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <ul className="space-y-2 text-white/80 text-sm">
                                        {feature.items.map((item, j) => (
                                            <li key={j}>• {item}</li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Guide */}
                <section
                    id="guide"
                    className="min-h-screen snap-start flex flex-col justify-center px-4 sm:px-6 lg:px-12 py-20 bg-black/50 scroll-mt-20"
                >
                    <div className="w-full max-w-5xl mx-auto text-center">
                        <motion.h2
                            {...fadeUp(0)}
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
                        >
                            Quick Start Guide
                        </motion.h2>

                        <motion.p
                            {...fadeUp(0.2)}
                            className="text-white/70 max-w-2xl mx-auto mb-12 text-lg"
                        >
                            Three simple steps to get your team running smoothly.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: <BookOpen className="w-8 h-8 text-blue-300 mb-4 mx-auto" />,
                                    title: "1. Onboard",
                                    desc: "Add employees, assign them to projects, and link projects with GitHub.",
                                },
                                {
                                    icon: <MousePointer className="w-8 h-8 text-green-300 mb-4 mx-auto" />,
                                    title: "2. Track",
                                    desc: "Monitor project progress automatically — tasks update in real time with every commit.",
                                },
                                {
                                    icon: <Settings className="w-8 h-8 text-purple-300 mb-4 mx-auto" />,
                                    title: "3. Automate",
                                    desc: "Generate AI-driven posters from a single prompt and publish instantly to social media.",
                                },
                            
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeUp(i * 0.1)}
                                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-md 
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-white/20"
                                >
                                    {step.icon}
                                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>


                        <Link to="/signin">
                            <Button className="mt-12 gap-2 rounded-xl transition-colors duration-300 text-white font-semibold shadow-md items-center ">
                                <CheckCircle2 className="w-5 h-5" /> Get Started Now
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="w-full bg-[#0a0a0a] text-white">
                <Footer />
            </footer>
        </>
    );
};

export default LandingPage;
