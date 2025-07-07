import { Twitter, Linkedin, Github, Mail, Phone, Users, Activity } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socials = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Github, href: "#", label: "GitHub" },
    ];

    return (
        <footer className="w-full bg-gradient-to-t from-[#0a0a0a] via-[#101010] to-[#1a1a1a] border-t border-white/10 backdrop-blur-md text-white relative z-10">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">

                {/* Top: Branding + Socials */}
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    <div className="flex-1 min-w-[200px]">
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                            Worklane <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff84] to-[#ffffffb5]">Control</span>
                        </h2>
                        <p className="text-white/60 max-w-sm text-sm sm:text-base">
                            Automate your operations. Control your brand. Stay ahead with zero chaos.
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
                    {/* Email */}
                    <div className="bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-md">
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-purple-300" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1 text-base sm:text-lg">Email</h4>
                                <p className="text-white/70 text-sm break-all">parthdelvadiya@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-md">
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <Phone className="w-5 h-5 text-blue-300" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1 text-base sm:text-lg">Phone</h4>
                                <p className="text-white/70 text-sm break-all">+91 85110 96433</p>
                            </div>
                        </div>
                    </div>

                    {/* Team */}
                    <div className="bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-md">
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-green-300" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1 text-base sm:text-lg">Team</h4>
                                <p className="text-white/70 text-sm">Parth – One man army</p>
                            </div>
                        </div>
                    </div>
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
