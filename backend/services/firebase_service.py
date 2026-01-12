import firebase_admin
from firebase_admin import credentials, firestore
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEY_PATH = os.path.join(BASE_DIR, "firebase-key.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(KEY_PATH)
    firebase_admin.initialize_app(cred)

db = firestore.client()

def get_latest_health(user_id="user_001"):
    print(f"\n🔍 [FIREBASE SERVICE] Fetching health data for user_id: {user_id}")
    # Use same collection and structure as frontend
    doc_ref = db.collection("health_data").document(user_id)
    doc = doc_ref.get()

    if not doc.exists:
        print(f"   ❌ Document does not exist for user_id: {user_id}")
        print(f"   📍 Collection: 'health_data', Document: '{user_id}'")
        return None

    data = doc.to_dict()
    print(f"   ✅ Document exists!")
    print(f"   📄 Full document data: {data}")
    
    # Get 'latest' field like frontend does
    health = data.get("latest")
    print(f"   💊 Health data extracted from 'latest' field: {health}")
    
    return health
