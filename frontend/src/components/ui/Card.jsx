import React from "react";

export const Card = ({ children, className = "", ...props }) => (
    <div
        className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl 
        p-5 sm:p-6 transition-all duration-300 hover:shadow-4xl hover:border-white/30 
        ${className}`}
        {...props}
    >
        {children}
    </div>
);

export const CardHeader = ({ children, className = "", ...props }) => (
    <div className={`mb-3 sm:mb-4 ${className}`} {...props}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = "", ...props }) => (
    <h3 className={`text-lg sm:text-xl font-semibold text-white mb-2 ${className}`} {...props}>
        {children}
    </h3>
);

export const CardDescription = ({ children, className = "", ...props }) => (
    <p className={`text-gray-300 text-sm sm:text-base leading-relaxed ${className}`} {...props}>
        {children}
    </p>
);

export const CardContent = ({ children, className = "", ...props }) => (
    <div className={`${className}`} {...props}>
        {children}
    </div>
);
