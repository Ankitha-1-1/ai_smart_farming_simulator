import { motion } from "framer-motion";
import { Droplets, CheckCircle } from "lucide-react";

interface PredictionResultProps {
  waterNeeded: boolean;
  confidence: number;
}

const PredictionResult = ({ waterNeeded, confidence }: PredictionResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="farm-card mt-6"
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${
            waterNeeded ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"
          }`}
        >
          {waterNeeded ? <Droplets size={28} /> : <CheckCircle size={28} />}
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {waterNeeded ? "Water Needed — Auto Irrigation ON" : "No Irrigation Needed — System Stable"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Confidence: <span className="font-semibold text-foreground">{confidence}%</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionResult;
