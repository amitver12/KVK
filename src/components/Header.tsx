import { motion } from "motion/react";
import { Stethoscope, Shield, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Stethoscope size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">DermScan AI</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
          <a href="#privacy" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
          <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Support</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            Sign In
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm hover:shadow-md">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
