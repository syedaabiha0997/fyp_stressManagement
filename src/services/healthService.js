import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getLatestHealthData = async (userId) => {
  try {
    const docRef = doc(db, "health_data", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().latest;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching health data:", error);
    return null;
  }
};
