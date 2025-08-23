// typingVariants
export const typingVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
        width: "auto",
        opacity: 1,
        transition: { duration: 1.5, ease: "easeOut", delay: 0.1 },
    },
};

// fadeIn for cards and sections
export const fadeIn = {
    hidden: { opacity: 0, filter: "blur(4px)", y: 10 },
    visible: {
        opacity: 1,
        filter: "blur(0)",
        y: 0,
        transition: { duration: 0.5, delay: 0.2 },
    },
};

// fadeIn for lists
export const staggerFade = (i = 0) => ({
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0)",
        transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    },
});
