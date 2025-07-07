import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!fullName || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email address.");
            return;
        }

        if (password.length < 6) {
            setError("Password should be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black text-white px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6 w-full max-w-md space-y-4"
            >
                {/* Heading */}
                <div className="space-y-1">
                    <h2 className="text-xl font-bold text-white">Create Account</h2>
                    <p className="text-white/60 text-sm">
                        Join <span className="text-blue-300 font-medium">Worklane Control</span>
                    </p>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                    <label className="text-white/70 text-sm">Full Name</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-md text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-white/70 text-sm">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-md text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="space-y-1 relative">
                    <label className="text-white/70 text-sm">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-md text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                        className="absolute right-3 top-9 text-white/50 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                    <label className="text-white/70 text-sm">Confirm Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-md text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* Error Message */}
                {error && <div className="text-red-400 text-sm">{error}</div>}

                {/* Button */}
                <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="w-full text-sm font-semibold py-2.5 rounded-md disabled:opacity-50"
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </Button>

                {/* Switch */}
                <p className="text-center text-sm text-white/60">
                    Already have an account?{" "}
                    <Link to="/SignIn" className="text-blue-300 hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
