from flask import Flask, request, jsonify
from flask_cors import CORS

from services.dataset_service import find_dataset_answer
from services.ai_service import get_ai_response
from services.firebase_service import get_latest_health
import os
from dotenv import load_dotenv

# This loads the variables from .env into the environment
load_dotenv()

# Now you can access your key like this:
api_key = os.getenv("OPENROUTER_API_KEY")

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask backend is running successfully!"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")
    user_id = data.get("user_id", "user_001")

    print(f"\n🔵 [BACKEND] Received request:")
    print(f"   User ID: {user_id}")
    print(f"   Message: {user_message}")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # 1️⃣ Dataset (static knowledge)
    dataset_answer = find_dataset_answer(user_message)
    if dataset_answer:
        print(f"   ✅ Dataset answer found: {dataset_answer}")
        return jsonify({
            "choices": [{
                "message": {"content": dataset_answer}
            }]
        })

    # 2️⃣ Firebase live data
    health_data = get_latest_health(user_id)
    print(f"\n🟢 [FIREBASE] Health data fetched:")
    print(f"   Health Data: {health_data}")
    if health_data:
        print(f"   Heart Rate: {health_data.get('heart_rate')}")
        print(f"   BP: {health_data.get('BP')}")
        print(f"   Stress: {health_data.get('stress')}")
    else:
        print(f"   ❌ No health data found for user_id: {user_id}")

    # 3️⃣ AI with Firebase context
    ai_response = get_ai_response(user_message, health_data)
    print(f"\n🟡 [AI] Response generated")
    print(f"   Full Response: {ai_response}")

    return jsonify(ai_response)


if __name__ == "__main__":
    app.run(debug=True)
