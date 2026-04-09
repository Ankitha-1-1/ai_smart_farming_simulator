# 🌱 AI-Based Smart Farming Simulator

A simple **AI + IoT-based web application** that predicts whether irrigation is required based on environmental conditions.

This project simulates **IoT sensor data** and uses a **Machine Learning model** to make smart farming decisions.

---

## 🚀 Features

- 🌡️ Input environmental parameters (temperature, humidity, etc.)
- 🤖 AI-based irrigation prediction
- 💧 Shows whether water is needed or not
- 📊 Displays confidence level
- 🌐 Interactive web UI (React frontend)
- 🔗 Backend API (Flask)

---

## 🧠 How It Works

1. User enters sensor values (simulated IoT data)
2. Frontend sends data to backend API
3. Backend ML model processes input
4. Prediction is returned:
   - 🚿 Water Needed  
   - ✅ No Irrigation Needed

---

## 🛠️ Tech Stack

### Frontend:
- React (TypeScript)
- HTML, CSS, JavaScript
- Framer Motion (animations)

### Backend:
- Python
- Flask
- Scikit-learn (Random Forest)

---

## 📁 Project Structure
```
ai-smart-farming-simulator/
│
├── Backend/
│   ├── app.py
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Index.tsx
│   │   ├── components/
│   │   ├── App.tsx
│
├── README.md
```


---

## ⚙️ Installation & Setup

### 🔹 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-smart-farming-simulator.git
cd ai-smart-farming-simulator
```

### 🔹 2. Setup Backend
```bash
cd Backend
pip install flask flask-cors pandas numpy scikit-learn
python app.py
```
Backend runs on:
```
http://127.0.0.1:5000
```


### 🔹 3. Setup Frontend
```bash
cd Frontend
npm install
npm run dev
```
Frontend runs on:
```
http://localhost:5173
```

## 🔗 API Endpoint

### POST `/predict`

#### Request:
```json
{
  "hour": 14,
  "temperature": 36,
  "humidity": 30,
  "soil_moisture": 20,
  "rainfall": 0,
  "sunlight": 9
}
```
#### Response:
```json
{
  "result": "Water Needed - Auto Irrigation ON",
  "confidence": 0.85
}
```

## 📊 Sample Output

- 🚿 Water Needed - Auto Irrigation ON  
- Confidence: 85%

---

## 💡 Future Improvements

- Real IoT sensor integration  
- Mobile app support  
- Cloud deployment  
- Advanced ML models  

---



## 🏆 Conclusion

This project demonstrates how **AI + IoT concepts** can be used in **smart agriculture** to improve efficiency and automate decision-making.
