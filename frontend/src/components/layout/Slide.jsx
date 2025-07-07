import { motion } from "framer-motion";

const Slide = ({ id, text, sub, children }) => {
    return (
        <section
            id={id}
            className="min-h-screen w-full flex flex-col justify-center items-center snap-start px-4 sm:px-6"
        >
            {/* Responsive Animated Heading */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center tracking-tight drop-shadow-[0_4px_20px_rgba(59,130,246,0.35)]"
            >
                {text}
            </motion.h1>

            {/* Responsive Animated Subheading */}
            <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-base sm:text-lg md:text-xl mt-6 text-white/70 text-center max-w-xl leading-relaxed"
            >
                {sub}
            </motion.p>

            {/* Children */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-center"
            >
                <div className="mt-12 w-full flex justify-center px-4">
                    {children}
                </div>
            </motion.div>
        </section>
    );
};

export default Slide;
