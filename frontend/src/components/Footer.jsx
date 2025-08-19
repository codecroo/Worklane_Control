import { Twitter, Linkedin, Github, Mail, Phone, MapPin, Activity } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socials = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Github, href: "#", label: "GitHub" },
    ];

    const contacts = [
        {
            icon: Mail,
            color: "purple",
            title: "Email",
            value: "parthdelvadiya@gmail.com",
        },
        {
            icon: Phone,
            color: "blue",
            title: "Phone",
            value: "+91 85110 96432",
        },
        {
            icon: MapPin,
            color: "green",
            title: "Location",
            value: "India",
        },
    ];

    return (
        <footer className="w-full bg-gradient-to-t from-[#0a0a0a] via-[#101010] to-[#1a1a1a] border-t border-white/10 backdrop-blur-md text-white relative z-10">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">

                {/* Top: Branding + Socials */}
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    <div className="flex-1 min-w-[200px]">
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                            Worklane{" "}
                            <span className="text-blue-300">Control</span>
                        </h2>
                        <p className="text-white/60 max-w-sm text-sm sm:text-base">
                            Simplify tasks. Amplify impact. Operate without friction.
                        </p>
                    </div>

                    <div className="flex gap-4 items-start">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                            >
                                <Icon className="w-5 h-5 text-white/70" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
                    {contacts.map(({ icon: Icon, color, title, value }) => (
                        <div
                            key={title}
                            className="bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-md"
                        >
                            <div className="flex gap-4 items-start">
                                <div
                                    className={`w-10 h-10 bg-${color}-500/20 rounded-lg flex items-center justify-center`}
                                >
                                    <Icon className={`w-5 h-5 text-${color}-300`} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-1 text-base sm:text-lg">
                                        {title}
                                    </h4>
                                    <p className="text-white/70 text-sm break-all">{value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-6 text-white/50 text-sm gap-4">
                    <p>© {currentYear} Worklane Control. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">System Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}