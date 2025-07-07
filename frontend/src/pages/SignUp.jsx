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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black text-white px-4 py-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg space-y-6 p-6 sm:p-8"
            >
                {/* Heading */}
                <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Create Account</h2>
                    <p className="text-white/60 text-sm sm:text-base">
                        Join <span className="text-blue-300 font-medium">Worklane Control</span>
                    </p>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-white/70 text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-white/10 border border-white/10 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-white/70 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2.5 bg-white/10 border border-white/10 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="space-y-2 relative">
                    <label className="text-white/70 text-sm font-medium">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-2.5 bg-white/10 border border-white/10 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                        className="absolute right-3 top-[45px] text-white/50 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-white/70 text-sm font-medium">Confirm Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-2.5 bg-white/10 border border-white/10 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* Error Message */}
                {error && <div className="text-red-400 text-sm sm:text-base">{error}</div>}

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="w-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-md transition-all duration-300 disabled:opacity-50"
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </Button>

                {/* Switch to Sign In */}
                <p className="text-center text-sm text-white/60">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-300 hover:underline">
                        Sign in
                    </Link>
                </p>

                {/* Back to Home */}
                <div className="text-center mt-3">
                    <Link
                        to="/"
                        className="inline-block text-sm text-white/60 hover:text-blue-300 transition duration-200"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
