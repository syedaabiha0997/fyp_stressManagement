// src/pages/Reports.jsx
import React from "react";
import "./Reports.css";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Reports = () => {
  // Dummy DATA — replace later with API
  const heartRateData = {
    labels: ["2m", "4m", "6m", "8m", "10m", "12m"],
    datasets: [
      {
        label: "Heart Rate (BPM)",
        data: [68, 72, 71, 75, 70, 73],
        borderColor: "#b45252ff",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const bpData = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    datasets: [
      {
        label: "Systolic (sample)",
        data: [110, 115, 120, 130, 140, 145, 150, 155, 160, 165, 170, 160],
        backgroundColor: "#b45252ff",
      },
    ],
  };

  const sleepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sleep Hours",
        data: [7, 6.5, 8, 7.5, 6, 9, 8.5],
        borderColor: "#b45252ff",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const incidents = [
    { date: "3 Oct 2025", time: "5:45 am", bpm: "115 (high)", bp: "138/90 (Elevated)", status: "Warning" },
    { date: "7 Oct 2025", time: "8:34 am", bpm: "55 (low)", bp: "110/70 (Normal)", status: "Critical" },
    { date: "8 Oct 2025", time: "9:00 pm", bpm: "86 (normal)", bp: "120/80 (Normal)", status: "Stable" },
    { date: "9 Oct 2025", time: "12:00 am", bpm: "98 (high)", bp: "130/85 (Pre-high)", status: "Attention" },
  ];

  return (
    <div className="report-container">

      {/* HEADER */}
      <div className="report-header">
        <h1 className="report-title">AI Stress Detection System</h1>
        <p className="report-date">Oct 29, 2025</p>
      </div>

      {/* TOP CARDS */}
      <div className="top-cards">
        <div className="stat-card">
          <p className="stat-title">Average stress level</p>
          <p className="stat-value">Normal</p>
        </div>

        <div className="stat-card">
          <p className="stat-title">Total Alerts</p>
          <p className="stat-value">15</p>
        </div>

        <div className="stat-card">
          <p className="stat-title">Average breathing breaks</p>
          <p className="stat-value">5 per Day</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="graphs-row">

        <div className="graph-card">
          <p className="graph-title">Heart rate graph</p>
          <Line data={heartRateData} />
        </div>

        <div className="graph-card">
          <div className="bp-header">
            <p className="graph-title">Blood Pressure History</p>
            <span className="bp-filter">Month</span>
          </div>
          <Bar data={bpData} />
        </div>

        <div className="graph-card">
          <p className="graph-title">Sleep Schedule</p>
          <Line data={sleepData} />
        </div>
      </div>

      {/* TABLE */}
      <h2 className="alert-title">Alerts & Incidents</h2>

      <table className="alert-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Heart rate (BPM)</th>
            <th>Blood pressure</th>
            <th>Alert status</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((row, i) => (
            <tr key={i}>
              <td>{row.date}</td>
              <td>{row.time}</td>
              <td>{row.bpm}</td>
              <td>{row.bp}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Reports;
