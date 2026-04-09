from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
CORS(app)  # allow frontend connection

# 🔹 Train model once when server starts
def train_model():
    np.random.seed(42)
    data = []

    for _ in range(500):
        hour = np.random.randint(0, 24)
        temperature = np.random.uniform(18, 42)
        humidity = np.random.uniform(20, 95)
        soil_moisture = np.random.uniform(5, 80)
        rainfall = np.random.uniform(0, 10)
        sunlight = np.random.uniform(0, 12)

        water_needed = 1 if (
            soil_moisture < 30 or
            (temperature > 35 and humidity < 40) or
            (rainfall < 1 and sunlight > 8)
        ) else 0

        data.append([
            hour, temperature, humidity,
            soil_moisture, rainfall, sunlight,
            water_needed
        ])

    df = pd.DataFrame(data, columns=[
        "hour", "temperature", "humidity",
        "soil_moisture", "rainfall", "sunlight",
        "water_needed"
    ])

    X = df[["hour", "temperature", "humidity", "soil_moisture", "rainfall", "sunlight"]]
    y = df["water_needed"]

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)

    return model


model = train_model()


# 🔹 API route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        input_data = [[
            data["hour"],
            data["temperature"],
            data["humidity"],
            data["soil_moisture"],
            data["rainfall"],
            data["sunlight"]
        ]]

        prediction = model.predict(input_data)[0]
        confidence = model.predict_proba(input_data)[0][1]

        if prediction == 1:
            result = "🚿 Water Needed - Auto Irrigation ON"
        else:
            result = "✅ No Irrigation Needed - System Stable"

        return jsonify({
            "result": result,
            "confidence": round(float(confidence), 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# 🔹 Run server
if __name__ == "__main__":
    app.run(debug=True)
