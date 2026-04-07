import { motion } from "motion/react";
import { AlertTriangle, CheckCircle2, Info, ListChecks } from "lucide-react";
import { AnalysisResult } from "@/src/services/gemini";

interface AnalysisResultProps {
  result: AnalysisResult;
}

export default function AnalysisResultDisplay({ result }: AnalysisResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/50">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
              Analysis Report
            </span>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <CheckCircle2 size={16} className="text-green-500" />
              AI Verified
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{result.condition}</h2>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-blue-600"
              />
            </div>
            <span className="text-sm font-bold text-blue-600">
              {Math.round(result.confidence * 100)}% Confidence
            </span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <div className="flex items-center gap-2 text-gray-900 font-bold mb-3">
              <Info size={20} className="text-blue-600" />
              Description
            </div>
            <p className="text-gray-600 leading-relaxed">
              {result.description}
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 text-gray-900 font-bold mb-3">
              <ListChecks size={20} className="text-blue-600" />
              Recommendations
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </section>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
            <AlertTriangle className="text-amber-600 shrink-0" size={24} />
            <div>
              <h4 className="text-sm font-bold text-amber-900 mb-1">Medical Disclaimer</h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                {result.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
