import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/magicui/animated-grid-pattern";
import { Home, Info, BookUser, FileText, HelpCircle } from "lucide-react";

const Footer = () => {
  const items = [
    { title: "Home", href: "/", icon: Home },
    { title: "Communities", href: "/communities", icon: BookUser },
    { title: "About", href: "/about", icon: Info },
    { title: "Terms of Service", href: "/terms-of-service", icon: FileText },
    { title: "Questions", href: "/questions", icon: HelpCircle },
  ];

  return (
    <footer className="relative overflow-hidden mt-[20vh]">
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fade-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
            <mask id="fade-mask">
              <rect width="100%" height="100%" fill="url(#fade-gradient)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="currentColor"
            mask="url(#fade-mask)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12">
        <ul className="flex flex-wrap items-center justify-center gap-6 mb-8">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center text-sm font-medium text-gray-800 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <item.icon className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100" />
                <span className="relative">
                  {item.title}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-center">
          <div className="inline-block mb-4">
            {/* Placeholder for logo - en desarrollo */}
            <span className="text-2xl font-bold dark:text-white">Uquick</span>
          </div>
          <div className="text-sm text-gray-800 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Uquick. All rights reserved.
          </div>
        </div>
      </div>

      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray={1}
        numSquares={30}
        maxOpacity={0.3}
        duration={5}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-full w-full"
        )}
      />
    </footer>
  );
};

export default Footer;
