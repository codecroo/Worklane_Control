import React from "react";

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "default",
    className = "",
    ...props
}) => {
    const base =
        "inline-flex items-center justify-center font-medium rounded-md cursor-pointer select-none backdrop-blur-md border transition-all duration-200 ease-in-out active:scale-[0.97] focus:outline-none whitespace-nowrap";

    const variants = {
        primary:
            "bg-blue-500/10 text-blue-200 border border-blue-300/30 shadow-md hover:bg-blue-500/20 hover:shadow-[0_6px_20px_rgba(59,130,246,0.3)] active:translate-y-[1px] active:shadow-inner",
        secondary:
            "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:shadow-[0_4px_14px_rgba(255,255,255,0.2)] active:translate-y-[1px] active:shadow-inner",
        outline:
            "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:shadow-[0_3px_10px_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-inner",
        danger:
            "bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20 hover:shadow-[0_5px_16px_rgba(239,68,68,0.3)] active:translate-y-[1px] active:shadow-inner",
    };


    const sizes = {
        default: "px-5 py-2.5 text-sm sm:px-6 sm:py-3",
        sm: "px-4 py-2 text-xs sm:text-sm",
        lg: "px-6 py-3 text-base sm:text-lg",
        icon: "p-3 sm:p-3.5",
    };

    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.default;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${base} ${variantClass} ${sizeClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
