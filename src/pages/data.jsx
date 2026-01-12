import { useEffect, useState } from "react";
import { getLatestHealthData } from "../services/healthService";

const Data = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  const USER_ID = "user_001";   // <-- change if needed

  useEffect(() => {
    const fetchHealthData = async () => {
      const data = await getLatestHealthData(USER_ID);
      setHealth(data);
      setLoading(false);
    };

    fetchHealthData();
  }, []);

  console.log(health,"health")

  if (loading) {
    return <p className="text-center mt-10 text-body text-primary bg-background min-h-screen">Loading health data...</p>;
  }

  if (!health) {
    return <p className="text-center mt-10 text-body text-primary bg-background min-h-screen">No health data found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-background min-h-screen">
      <h1 className="text-title font-bold mb-6 text-primary">User Health Data</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow border border-accent">
          <h3 className="text-secondary text-body">Heart Rate</h3>
          <p className="text-title font-bold text-primary">
            {health.heart_rate}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-accent">
          <h3 className="text-secondary text-body">Blood Pressure</h3>
          <p className="text-title font-bold text-primary">
            {health.BP?.systolic}/{health.BP?.diastolic}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-accent">
          <h3 className="text-secondary text-body">Stress Level</h3>
          <p className="text-title font-bold text-primary">
            {health.stress?.level}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Data;
