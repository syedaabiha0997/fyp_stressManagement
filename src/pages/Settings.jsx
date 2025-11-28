import { Search, User } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";

export default function Settings() {
  const [_name, _setName] = useState("");
  const [_email, _setEmail] = useState("");
  const [_dob, _setDob] = useState("");
  const [_theme, _setTheme] = useState("");
  const [_stressAlert, _setStressAlert] = useState(true);
  const [_dataPrivacy, _setDataPrivacy] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f7] px-4 py-6">

      <Header />

      {/* PROFILE ICON */}
      <div className="flex flex-col items-center mb-6">
        <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center shadow">
          <User className="w-10 h-10 text-[#8B0000]" />
        </div>
        <h2 className="text-lg font-semibold mt-3 text-gray-900">My Profile</h2>
      </div>

      {/* FORM CONTAINER (HEIGHT FIXED HERE) */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">

        <div className="flex justify-between gap-3">
          {/* NAME */}
          <div className="w-full">
            <label className="block text-gray-700 font-semibold text-sm mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border-2 border-[#8B0000] rounded-lg px-3 py-2 text-sm"
              placeholder="Enter your name"
            />
          </div>

          {/* EMAIL */}
          <div className="w-full">
            <label className="block text-gray-700 font-semibold text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border-2 border-[#8B0000] rounded-lg px-3 py-2 text-sm"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* DOB */}
        <div>
          <label className="block text-gray-700 font-semibold text-sm mb-1">
            Date Of Birth
          </label>
          <input
            type="date"
            className="w-full border-2 border-[#8B0000] rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* SETTINGS */}
        <div>
          <h3 className="text-lg font-bold mb-3">APP Settings</h3>

          <p className="font-semibold text-gray-800 text-sm mb-2">
            Notification Preference
          </p>

          {/* STRESS ALERT */}
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-gray-800">Stress Alert Notification (ON)</span>

            <button className="relative h-6 w-12 bg-[#8B0000] rounded-full">
              <div className="absolute top-1 left-1 h-4 w-4 bg-white rounded-full translate-x-5"></div>
            </button>
          </div>

          {/* PRIVACY */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-800">Data Privacy Permissions</span>

            <button className="relative h-6 w-12 bg-gray-300 rounded-full">
              <div className="absolute top-1 left-1 h-4 w-4 bg-white rounded-full"></div>
            </button>
          </div>


        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 pt-4 justify-center">
          <button className="bg-[#8B0000] text-white px-6 py-2 rounded-lg text-sm font-semibold">
            Save Changes
          </button>

          <button className="bg-[#8B0000] text-white px-6 py-2 rounded-lg text-sm font-semibold">
            Change Password
          </button>

          <button className="bg-[#8B0000] text-white px-6 py-2 rounded-lg text-sm font-semibold">
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}
