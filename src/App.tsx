/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import UploadSection from "./components/UploadSection";
import AnalysisResultDisplay from "./components/AnalysisResult";
import Footer from "./components/Footer";
import { analyzeSkinImage, AnalysisResult } from "./services/gemini";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          const analysisResult = await analyzeSkinImage(base64, file.type);
          setResult(analysisResult);
          // Scroll to result after a short delay to allow animation
          setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          }, 100);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to read image file");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />
      
      <main>
        <Hero onStart={handleStart} />
        
        <div ref={uploadRef} className="scroll-mt-24">
          <UploadSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto px-4 mb-8"
            >
              <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-center font-medium">
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnalysisResultDisplay result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
