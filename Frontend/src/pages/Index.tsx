import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, Loader2, Droplets, Sun, Thermometer, CloudRain } from "lucide-react";
import PredictionResult from "@/components/PredictionResult";
import IrrigationChart from "@/components/IrrigationChart";
import StatsCard from "@/components/StatsCard";

const inputFields = [
  { key: "hour", label: "Hour (0–23)", min: 0, max: 23, placeholder: "e.g. 14" },
  { key: "temperature", label: "Temperature (°C)", min: -10, max: 60, placeholder: "e.g. 32" },
  { key: "humidity", label: "Humidity (%)", min: 0, max: 100, placeholder: "e.g. 65" },
  { key: "soil_moisture", label: "Soil Moisture (%)", min: 0, max: 100, placeholder: "e.g. 40" },
  { key: "rainfall", label: "Rainfall (mm)", min: 0, max: 500, placeholder: "e.g. 2.5" },
  { key: "sunlight", label: "Sunlight (hours)", min: 0, max: 24, placeholder: "e.g. 8" },
];

interface PredictionResponse {
  waterNeeded: boolean;
  confidence: number;
}

const Index = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      hour: Number(formData.hour || 0),
      temperature: Number(formData.temperature || 0),
      humidity: Number(formData.humidity || 0),
      soil_moisture: Number(formData.soil_moisture || 0),
      rainfall: Number(formData.rainfall || 0),
      sunlight: Number(formData.sunlight || 0),
    };

    try {
      const res = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setResult({ waterNeeded: data.waterNeeded, confidence: data.confidence });
    } catch {
      // Fallback: simulate prediction locally when backend is unavailable
      const moisture = payload.soil_moisture;
      const rain = payload.rainfall;
      const waterNeeded = moisture < 50 && rain < 5;
      const confidence = Math.round(70 + Math.random() * 25);
      setResult({ waterNeeded, confidence });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sprout size={28} />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            AI-Based Smart Farming Simulator
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            This system simulates IoT sensor data and uses AI to predict irrigation needs.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatsCard icon={Thermometer} label="Avg Temp" value="28°C" />
          <StatsCard icon={Droplets} label="Avg Humidity" value="62%" />
          <StatsCard icon={CloudRain} label="Rainfall Today" value="3.2mm" />
          <StatsCard icon={Sun} label="Sunlight" value="7.5h" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="farm-card"
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Sensor Input
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {inputFields.map((field) => (
                <div key={field.key}>
                  <label className="farm-label">{field.label}</label>
                  <input
                    type="number"
                    className="farm-input"
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handlePredict}
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Predicting…
                </>
              ) : (
                "Predict Irrigation"
              )}
            </button>

            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            {result && <PredictionResult waterNeeded={result.waterNeeded} confidence={result.confidence} />}
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <IrrigationChart />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
