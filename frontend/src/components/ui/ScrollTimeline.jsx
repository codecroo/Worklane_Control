import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Card, CardContent } from "./Card"; // keep this if your card exports are named

function classNames(...parts) {
    return parts.filter(Boolean).join(" ");
}

export default function ScrollTimeline({
    events = [
        {
            id: "1",
            year: "2023",
            title: "Getting Started",
            subtitle: "Quick setup",
            description: "Short intro / fallback description.",
            guideContent: (
                <>
                    <h4 className="text-sm font-semibold mb-1">Overview</h4>
                    <p className="text-sm leading-relaxed">
                        This quickstart helps you install and configure the app. Steps:
                        install dependencies, run dev server, open the dashboard.
                    </p>
                </>
            ),
        },
        {
            id: "2",
            year: "2024",
            title: "Account Management",
            subtitle: "Users & roles",
            description: "Short intro / fallback description.",
            guideContent: (
                <>
                    <h4 className="text-sm font-semibold mb-1">Roles & Permissions</h4>
                    <ul className="text-sm list-disc list-inside leading-relaxed">
                        <li>Create users and assign roles</li>
                        <li>Manage permissions from Settings → Access</li>
                        <li>Audit log available under Admin</li>
                    </ul>
                </>
            ),
        },
        {
            id: "3",
            year: "2025",
            title: "Advanced Tips",
            subtitle: "Performance & best practices",
            description: "Short intro / fallback description.",
            guideContent: (
                <>
                    <h4 className="text-sm font-semibold mb-1">Best Practices</h4>
                    <p className="text-sm leading-relaxed">
                        Cache expensive queries, lazy-load large components, and use code-splitting when needed.
                    </p>
                </>
            ),
        },
    ],
    title = "",
    subtitle = "",
    animationOrder = "sequential",
    cardAlignment = "alternating",
    lineColor = "bg-primary/30",
    activeColor = "bg-primary",
    progressIndicator = true,
    cardVariant = "default",
    cardEffect = "none",
    parallaxIntensity = 0.2,
    progressLineWidth = 2,
    progressLineCap = "round",
    className = "",
    connectorStyle = "line",
    perspective = false,
    darkMode = false,
}) {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const timelineRefs = useRef([]);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((v) => {
            const newIndex = Math.floor(v * events.length);
            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < events.length) {
                setActiveIndex(newIndex);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, events.length, activeIndex]);

    const yOffset = useTransform(
        smoothProgress,
        [0, 1],
        [parallaxIntensity * 100, -parallaxIntensity * 100]
    );

    const getCardVariants = (index) => {
        const baseDelay =
            animationOrder === "simultaneous"
                ? 0
                : animationOrder === "staggered"
                    ? index * 0.2
                    : index * 0.3;

        const initialStates = {
            fade: { opacity: 0, y: 20 },
            slide: {
                x:
                    cardAlignment === "left"
                        ? -100
                        : cardAlignment === "right"
                            ? 100
                            : index % 2 === 0
                                ? -100
                                : 100,
                opacity: 0,
            },
            scale: { scale: 0.8, opacity: 0 },
            flip: { rotateY: 90, opacity: 0 },
            none: { opacity: 1 },
        };

        return {
            initial: initialStates.none,
            whileInView: {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotateY: 0,
                transition: {
                    duration: 0.7,
                    delay: baseDelay,
                    ease: [0.25, 0.1, 0.25, 1.0],
                },
            },
            viewport: { once: false, margin: "-100px" },
        };
    };

    const getConnectorClasses = () => {
        const base = `absolute left-1/2 transform -translate-x-1/2 ${lineColor}`;
        const widthClass = `w-[${progressLineWidth}px]`;

        if (connectorStyle === "dots") {
            return classNames(base, "w-1 rounded-full");
        }
        if (connectorStyle === "dashed") {
            return classNames(
                base,
                widthClass,
                "[mask-image:linear-gradient(to_bottom,black_33%,transparent_33%,transparent_66%,black_66%)]",
                "[mask-size:1px_12px]"
            );
        }
        return classNames(base, widthClass);
    };

    const getCardClasses = (index) => {
        const base = "relative z-30 rounded-lg transition-all duration-300";
        const variants = {
            default: "bg-card shadow-md",
            elevated: "bg-card  shadow-md",
            outlined: "bg-card backdrop-blur border-2 border-primary/20",
            filled: "bg-primary/10 border border-primary/30",
        };
        const effects = {
            none: "",
            glow: "hover:shadow-[0_0_15px_rgba(var(--primary-rgb)/0.5)]",
            shadow: "hover:shadow-lg hover:-translate-y-1",
            bounce: "hover:scale-[1.03] hover:shadow-md active:scale-[0.97]",
        };

        const alignmentClasses =
            cardAlignment === "alternating"
                ? index % 2 === 0
                    ? "lg:mr-[calc(50%+20px)]"
                    : "lg:ml-[calc(50%+20px)]"
                : cardAlignment === "left"
                    ? "lg:mr-auto lg:ml-0"
                    : "lg:ml-auto lg:mr-0";

        return classNames(
            base,
            variants[cardVariant] || variants.default,
            effects[cardEffect] || "",
            alignmentClasses,
            "w-full lg:w-[calc(50%-40px)]",
            perspective ? "transform transition-transform" : ""
        );
    };

    return (
        <div
            ref={scrollRef}
            className={classNames(
                "relative min-h-screen w-full overflow-hidden",
                darkMode ? "bg-background text-foreground" : "",
                className
            )}
        >
            <div className="text-center py-16 px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
                <h2 className="text-3xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</h2>
            </div>

            <div className="relative max-w-6xl mx-auto px-4 pb-1">
                <div className="relative mx-auto">
                    <div className={classNames(getConnectorClasses(), "h-full absolute top-0 z-10")} />

                    {/* Progress indicator */}
                    {progressIndicator && (
                        <>
                            <motion.div
                                className="absolute top-0 z-10"
                                style={{
                                    height: progressHeight,
                                    width: progressLineWidth,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    borderRadius: progressLineCap === "round" ? "9999px" : "0px",
                                    background: `linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)`,
                                    boxShadow: `
                    0 0 15px rgba(99,102,241,0.5),
                    0 0 25px rgba(168,85,247,0.3)
                  `,
                                }}
                            />
                            <motion.div
                                className="absolute z-20"
                                style={{
                                    top: progressHeight,
                                    left: "50%",
                                    translateX: "-50%",
                                    translateY: "-50%",
                                }}
                            >
                                <motion.div
                                    className="w-5 h-5 rounded-full"
                                    style={{
                                        background:
                                            "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(99,102,241,0.5) 40%, rgba(34,211,238,0) 70%)",
                                        boxShadow: `
                      0 0 15px 4px rgba(168, 85, 247, 0.6),
                      0 0 25px 8px rgba(99, 102, 241, 0.4),
                      0 0 40px 15px rgba(34, 211, 238, 0.2)
                    `,
                                    }}
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>
                        </>
                    )}

                    <div className="relative z-20">
                        {events.map((event, index) => {
                            return (
                                <div
                                    key={event.id || index}
                                    ref={(el) => {
                                        timelineRefs.current[index] = el;
                                    }}
                                    className={classNames(
                                        "relative flex items-center mb-20 py-4",
                                        "flex-col lg:flex-row",
                                        cardAlignment === "alternating"
                                            ? index % 2 === 0
                                                ? "lg:justify-start"
                                                : "lg:flex-row-reverse lg:justify-start"
                                            : cardAlignment === "left"
                                                ? "lg:justify-start"
                                                : "lg:flex-row-reverse lg:justify-start"
                                    )}
                                >
                                    {/* center connector node */}
                                    <div className={classNames("absolute top-1/2 transform -translate-y-1/2 z-30", "left-1/2 -translate-x-1/2")}>
                                        <motion.div
                                            className={classNames(
                                                "w-6 h-6 rounded-full border-4 bg-background flex items-center justify-center",
                                                index <= activeIndex ? "border-primary" : "border bg-card"
                                            )}
                                            animate={
                                                index <= activeIndex
                                                    ? {
                                                        scale: [1, 1.3, 1],
                                                        boxShadow: [
                                                            "0 0 0px rgba(99,102,241,0)",
                                                            "0 0 12px rgba(99,102,241,0.6)",
                                                            "0 0 0px rgba(99,102,241,0)",
                                                        ],
                                                    }
                                                    : {}
                                            }
                                            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                                        />
                                    </div>

                                    <motion.div
                                        className={classNames(getCardClasses(index), "mt-12 lg:mt-0")}
                                        variants={getCardVariants(index)}
                                        initial="initial"
                                        whileInView="whileInView"
                                        viewport={{ once: false, margin: "-100px" }}
                                        style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
                                    >
                                        <Card className="bg-background border">
                                            <CardContent className="p-6">
                                                {/* ====== USER GUIDE CONTENT (replaces calendar badge) ====== */}
                                                {/* <div className="mb-3">
                                                    <span className="inline-block text-xs font-semibold uppercase px-2 py-1 rounded bg-primary/10 text-primary">
                                                        User Guide
                                                    </span>
                                                </div> */}

                                                <h3 className="text-xl font-bold mb-1">{event.title}</h3>

                                                {event.subtitle && <p className="text-muted-foreground font-medium mb-2">{event.subtitle}</p>}

                                                {/* show guideContent (preferred) or fallback to description */}
                                                <div className="text-sm text-muted-foreground space-y-2">
                                                    {event.guideContent ? (
                                                        typeof event.guideContent === "string" ? (
                                                            <p>{event.guideContent}</p>
                                                        ) : (
                                                            event.guideContent
                                                        )
                                                    ) : (
                                                        <p>{event.description}</p>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
