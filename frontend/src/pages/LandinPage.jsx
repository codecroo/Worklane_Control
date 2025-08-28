// LandingPage.jsx
import React, { useEffect, useRef } from "react";
import BG from "../assets/bg.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ui/ScrollReveal";
import ScrollTimeline from "../components/ui/ScrollTimeline";
import {
    ThreeDScrollTriggerContainer,
    ThreeDScrollTriggerRow,
} from "../components/ui/ThreeDScrollTrigger"; // adjust path

import {
    Briefcase,
    Megaphone,
    LineChart,
    BookOpen,
    MousePointer,
    Settings,
    LayoutDashboardIcon,
    ChevronRightCircleIcon,
    Users,
    FolderKanbanIcon,
    InstagramIcon,
    Github,
    Facebook,
    SparklesIcon,
    WorkflowIcon,
    MessageSquareTextIcon,
    Workflow,
    FolderCheckIcon,
    LucideWorkflow,
} from "lucide-react";
// import Lenis from "@studio-freight/lenis";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0.2, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
    viewport: { once: true },
});

const LandingPage = () => {
    // const lenisRef = useRef(null);
    // const rafIdRef = useRef(null);

    // useEffect(() => {
    //     if (typeof window === "undefined") return;
    //     if (lenisRef.current) return; // guard double-init (StrictMode)

    //     // temporarily disable native smooth so Lenis owns smoothing
    //     const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    //     document.documentElement.style.scrollBehavior = "auto";

    //     const lenis = new Lenis({
    //         duration: 0.8,
    //         easing: (t) => 1 - Math.pow(1 - t, 3),
    //         smooth: true,
    //     });

    //     lenisRef.current = lenis;

    //     const onScroll = ({ scroll, limit, velocity }) => {
    //         // you can read smoothed scroll & velocity here
    //         // console.log("lenis scroll:", scroll, "velocity:", velocity);
    //     };
    //     lenis.on("scroll", onScroll);

    //     function raf(time) {
    //         if (lenisRef.current) lenisRef.current.raf(time);
    //         rafIdRef.current = requestAnimationFrame(raf);
    //     }
    //     rafIdRef.current = requestAnimationFrame(raf);

    //     return () => {
    //         // restore scroll-behavior
    //         document.documentElement.style.scrollBehavior = prevScrollBehavior || "";

    //         if (lenisRef.current) {
    //             lenisRef.current.off("scroll", onScroll);
    //             if (typeof lenisRef.current.destroy === "function") {
    //                 try {
    //                     lenisRef.current.destroy();
    //                 } catch (err) {
    //                     // ignore destroy errors
    //                 }
    //             }
    //             lenisRef.current = null;
    //         }

    //         if (rafIdRef.current) {
    //             cancelAnimationFrame(rafIdRef.current);
    //             rafIdRef.current = null;
    //         }
    //     };
    // }, []);

    const events = [
        {
            title: <BookOpen className="w-8 h-8 text-blue-300 mb-4 mx-auto" />,
            guideContent: (
                <>
                    <h1 className="text-2xl font-bold">1. Onboard</h1>
                    <p className="mt-1 text-sm">
                        Add employees, assign them to projects, and link projects with GitHub.
                    </p>
                </>
            ),
        },
        {

            title: <MousePointer className="w-8 h-8 text-green-300 mb-4 mx-auto" />,
            guideContent: (
                <>
                    <h1 className="text-2xl font-bold">2. Track</h1>
                    <p className="mt-1 text-sm">
                        Monitor project progress automatically — tasks update in real time with every commit.
                    </p>
                </>
            ),
        },
        {

            title: <Settings className="w-8 h-8 text-purple-300 mb-4 mx-auto" />,
            guideContent: (
                <>
                    <h1 className="text-2xl font-bold">3. Automate</h1>
                    <p className="mt-1 text-sm">
                        Generate AI-driven posters from a single prompt and publish instantly to social media.                    </p>
                </>
            ),
        },
    ];


    return (
        <>
            <Navbar />

            <main
                className="relative w-full text-white snap-y snap-mandatory bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${BG})` }}
            >
                {/* Hero */}
                <section
                    id="home"
                    className="min-h-screen bg-black/50 snap-start flex flex-col justify-center items-center text-center px-4 scroll-mt-20"
                >
                    <motion.h1>
                        <ScrollReveal
                            size="xl"
                            textClassName="sm:text-5xl md:text-6xl font-extrabold mb-6"
                        >
                            Built for Modern Teams
                        </ScrollReveal>
                    </motion.h1>

                    <ScrollReveal
                        textClassName="max-w-xl text-white/70 text-base sm:text-lg md:text-xl mb-6"
                        size="sm"
                        align="center"
                        varient="primary"
                    >
                        Worklane Control will handle your management and marketing chaos -
                        with zero overhead.
                    </ScrollReveal>

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
                        <ScrollReveal
                            size="xl"
                            align="center"
                            textClassName="sm:text-5xl md:text-6xl font-extrabold mb-6"
                        >
                            Replace Your Stack
                        </ScrollReveal>

                        <ScrollReveal
                            size="sm"
                            align="center"
                            varient="primary"
                            textClassName="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-14 mx-auto"
                        >
                            Everything you need from managing projects to managing marketing
                            under one dashboard.
                        </ScrollReveal>

                        <div className="grid grid-cols-1 text-left sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: (
                                        <LayoutDashboardIcon className="w-6 h-6 text-green-300" />
                                    ),
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
                    className="min-h-screen snap-start flex flex-col justify-center py-20 bg-black/50 scroll-mt-20"
                >
                    <div className="w-full max-w-5xl mx-auto text-center">
                        <ScrollReveal
                            size="xl"
                            align="center"
                            textClassName="sm:text-5xl md:text-6xl font-extrabold mb-6"
                        >
                            Quick Start Guide
                        </ScrollReveal>


                        <ScrollReveal
                            textClassName="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-14 mx-auto"
                            size="sm"
                            align="center"
                            varient="primary"
                        >
                            Three simple steps to get your team running smoothly.
                        </ScrollReveal>

                        <ScrollTimeline
                            events={events}
                            parallaxIntensity={0.12}
                            progressIndicator={true}
                        />

                        <div className="w-full text-white">
                            {/* Container provides scroll-based velocity */}
                            <ThreeDScrollTriggerContainer className="py-20">

                                {/* First row */}
                                <ThreeDScrollTriggerRow baseVelocity={6} direction={1}>
                                    <span className="inline-flex items-center gap-3 px-8 text-2xl font-bold leading-none">
                                        <Users className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        Employees
                                    </span>
                                    <span className="inline-flex items-center gap-3 px-8 text-2xl font-bold leading-none">
                                        <FolderKanbanIcon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        Projects
                                    </span>
                                    <span className="inline-flex items-center gap-3 px-8 text-2xl font-bold leading-none">
                                        <InstagramIcon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        Instagram
                                    </span>
                                    <span className="inline-flex items-center gap-3 px-8 text-2xl font-bold leading-none">
                                        <Facebook className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        Facebook
                                    </span>
                                    <span className="inline-flex items-center gap-3 px-8 text-2xl font-bold leading-none">
                                        <Workflow className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        Tasks
                                    </span>
                                </ThreeDScrollTriggerRow>

                                {/* Second row, opposite direction */}
                                <ThreeDScrollTriggerRow baseVelocity={6} direction={-1} className="mt-10">
                                    <span className="inline-flex items-center gap-3 px-8 text-2xl font-bold leading-none">
                                        <Github className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        Github integrated
                                    </span>
                                    <span className="inline-flex items-center gap-3 px-8 text-2xl font-bold leading-none">
                                        <Facebook className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        One click post
                                    </span>
                                    <span className="inline-flex items-center gap-3 px-8 text-2xl font-bold leading-none">
                                        <SparklesIcon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        Poster generator
                                    </span>
                                    <span className="inline-flex items-center gap-3 px-8 text-2xl font-bold leading-none">
                                        <MessageSquareTextIcon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        No physical meetings
                                    </span>
                                    <span className="inline-flex items-center gap-3 px-8 text-2xl font-bold leading-none">
                                        <LucideWorkflow className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        Workflows like Agile/Scrum
                                    </span>
                                </ThreeDScrollTriggerRow>
                            </ThreeDScrollTriggerContainer>
                        </div>

                        <Link to="/signin">
                            <Button className="mt-12 gap-2 rounded-xl transition-colors duration-300 text-white font-semibold shadow-md items-center ">
                                Get Started Now <ChevronRightCircleIcon className="w-5 h-5" />
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