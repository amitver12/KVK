import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "motion/react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface UploadSectionProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
}

export default function UploadSection({ onAnalyze, isAnalyzing }: UploadSectionProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
    disabled: isAnalyzing,
  } as any);

  const handleRemove = () => {
    setPreview(null);
    setFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Skin Image</h2>
          <p className="text-gray-600 mb-8">Please ensure the image is clear and well-lit for the best results.</p>

          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                {...getRootProps()}
                className={cn(
                  "relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer",
                  isDragActive ? "border-blue-500 bg-blue-50/50" : "border-gray-200 hover:border-blue-400 hover:bg-gray-50"
                )}
              >
                <input {...getInputProps()} />
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <Upload size={32} />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    {isDragActive ? "Drop the image here" : "Click or drag image to upload"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG or WebP (max. 10MB)</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center"
              >
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={handleRemove}
                  disabled={isAnalyzing}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg transition-all"
                >
                  <X size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8">
            <button
              onClick={() => file && onAnalyze(file)}
              disabled={!file || isAnalyzing}
              className={cn(
                "w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2",
                !file || isAnalyzing
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
              )}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing Image...
                </>
              ) : (
                <>
                  <ImageIcon size={20} />
                  Start Analysis
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
