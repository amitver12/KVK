import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8"
        >
          <Sparkles size={16} />
          <span>AI-Powered Skin Analysis</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6"
        >
          Understand Your Skin <br />
          <span className="text-blue-600">With Precision.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Get instant insights into skin conditions using advanced AI. 
          Fast, private, and reliable analysis at your fingertips.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
          >
            Analyze Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all">
            Learn More
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Instant Results</h3>
            <p className="text-gray-600">Get analysis in seconds using our high-performance AI models.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Private & Secure</h3>
            <p className="text-gray-600">Your images are processed securely and never stored without consent.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">High Accuracy</h3>
            <p className="text-gray-600">Trained on thousands of clinical images for reliable pattern recognition.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
