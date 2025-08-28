"use client";

import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";

export const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ThreeDScrollTriggerContext = React.createContext(null);

export function ThreeDScrollTriggerContainer({ children, className = "", ...props }) {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, (v) => {
        const sign = v < 0 ? -1 : 1;
        const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
        return sign * magnitude;
    });

    return (
        <ThreeDScrollTriggerContext.Provider value={velocityFactor}>
            <div className={`relative w-full ${className}`} {...props}>
                {children}
            </div>
        </ThreeDScrollTriggerContext.Provider>
    );
}

export function ThreeDScrollTriggerRow(props) {
    const sharedVelocityFactor = useContext(ThreeDScrollTriggerContext);
    if (sharedVelocityFactor) {
        return (
            <ThreeDScrollTriggerRowImpl
                {...props}
                velocityFactor={sharedVelocityFactor}
            />
        );
    }
    return <ThreeDScrollTriggerRowLocal {...props} />;
}

function ThreeDScrollTriggerRowImpl({
    children,
    baseVelocity = 5,
    direction = 1,
    className = "",
    velocityFactor,
    ...props
}) {
    const containerRef = useRef(null);
    const [numCopies, setNumCopies] = useState(1);
    const x = useMotionValue(0);

    const prevTimeRef = useRef(0);
    const unitWidthRef = useRef(0);
    const baseXRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ro = new ResizeObserver(([entry]) => {
            const containerWidth = entry.contentRect.width;
            const block = container.querySelector(".threed-scroll-trigger-block");
            if (!block) return;

            const blockWidth = block.scrollWidth;
            unitWidthRef.current = blockWidth;

            if (blockWidth > 0) {
                const nextCopies = Math.max(
                    3,
                    Math.ceil(containerWidth / blockWidth) + 2
                );
                setNumCopies(nextCopies);
            }
        });

        ro.observe(container);
        return () => ro.disconnect();
    }, []);

    useAnimationFrame((time) => {
        const dt = (time - prevTimeRef.current) / 1000;
        prevTimeRef.current = time;

        const unitWidth = unitWidthRef.current;
        if (unitWidth <= 0) return;

        const velocity = velocityFactor.get();
        const speedMultiplier = Math.min(5, Math.abs(velocity));
        const scrollDirection = velocity >= 0 ? 1 : -1;
        const currentDirection = direction * scrollDirection;

        const pixelsPerSecond = (unitWidth * baseVelocity) / 100;
        const moveBy =
            currentDirection * pixelsPerSecond * (1 + speedMultiplier) * dt;

        const newX = baseXRef.current + moveBy;
        baseXRef.current = wrap(0, unitWidth, newX);
        x.set(baseXRef.current);
    });

    const childrenArray = React.Children.toArray(children);

    return (
        <div
            ref={containerRef}
            className={`w-full overflow-hidden whitespace-nowrap ${className}`}
            {...props}
        >
            <motion.div
                className="inline-flex will-change-transform transform-gpu"
                style={{ x: useTransform(x, (v) => `${-v}px`) }}
            >
                {Array.from({ length: numCopies }).map((_, i) => (
                    <div
                        key={i}
                        className={`inline-flex shrink-0 ${i === 0 ? "threed-scroll-trigger-block" : ""
                            }`}
                        aria-hidden={i !== 0}
                    >
                        {childrenArray}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

function ThreeDScrollTriggerRowLocal(props) {
    const { scrollY } = useScroll();
    const localVelocity = useVelocity(scrollY);
    const localSmoothVelocity = useSpring(localVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
        const sign = v < 0 ? -1 : 1;
        const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
        return sign * magnitude;
    });

    return (
        <ThreeDScrollTriggerRowImpl
            {...props}
            velocityFactor={localVelocityFactor}
        />
    );
}
