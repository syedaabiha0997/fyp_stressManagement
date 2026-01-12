import requests

OPENROUTER_API_KEY = "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"

# def get_ai_response(user_message):
#     response = requests.post(
#         "https://openrouter.ai/api/v1/chat/completions",
#         headers={
#             "Authorization": f"Bearer {OPENROUTER_API_KEY}",
#             "Content-Type": "application/json"
#         },
#         json={
#             "model": "google/gemini-3-flash-preview",
#             "messages": [
#                 {
#                     "role": "system",
#                     "content": "You are a health assistant. Answer briefly and safely."
#                 },
#                 {
#                     "role": "user",
#                     "content": user_message
#                 }
#             ],
#             "temperature": 0.3,
#             "max_tokens": 120
#         }
#     )
#     return response.json()


def get_ai_response(user_message, health_data=None):

    print(f"\n🤖 [AI SERVICE] Generating response...")
    print(f"   User message: {user_message}")
    print(f"   Health data received: {health_data}")

    context = ""
    if health_data:
        heart_rate = health_data.get('heart_rate', 'N/A')
        bp_systolic = health_data.get('BP', {}).get('systolic', 'N/A')
        bp_diastolic = health_data.get('BP', {}).get('diastolic', 'N/A')
        stress_level = health_data.get('stress', {}).get('level', 'N/A')
        stress_status = health_data.get('stress', {}).get('status', 'N/A')
        
        context = f"""
User's Current Health Data:
- Heart rate: {heart_rate} bpm
- Blood pressure: {bp_systolic}/{bp_diastolic} mmHg
- Stress level: {stress_level} ({stress_status})
"""
        print(f"   ✅ Context created with health data")
    else:
        context = "Note: No specific health data available for this user."
        print(f"   ⚠️ No health data provided - context will be empty")

    prompt = f"""You are a knowledgeable and helpful personal health assistant AI. Your role is to provide accurate, safe, and personalized health advice.

IMPORTANT GUIDELINES:
1. Answer ALL health-related questions including diet, exercise, nutrition, fitness, medical conditions, symptoms, treatments, and general wellness.
2. Use the user's health data (if provided) to give personalized recommendations.
3. When asked about specific metrics (like heart rate, blood pressure), use the actual data provided.
4. For general health questions (diet, exercise, etc.), provide helpful advice while considering their current health status.
5. Always prioritize safety - recommend consulting healthcare professionals for serious medical concerns.
6. Keep responses clear, concise, and practical (2-4 sentences for most answers).

{context}

User Question: {user_message}

Provide a helpful, personalized health response:"""
    
    print(f"\n📝 [AI SERVICE] Prompt sent to OpenRouter:")
    print(f"   {prompt}")

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "mistralai/devstral-2512:free",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 300
        }
    )

    return response.json()