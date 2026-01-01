import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const Profile = () => {
  const { stats } = useSelector((state) => state.app); // applications stats
  const [user, setUser] = useState(null); // user data from DB
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [skillsInput, setSkillsInput] = useState([]);
  const [localSkills, setLocalSkills] = useState([]);

  const [stat, setStat] = useState(stats?.total || 0);

  // Fetch user profile from backend
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://applicaton-tracker.vercel.app/api/v1/user/get-profile`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setUser(data.user);
        setLocalSkills(data.user.skills || []);
        setSkillsInput(data.user.skills || []);
      }
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    // Update applications stat if stats change in Redux
    setStat(stats?.total || 0);
  }, [stats]);

  // Update skills handler
  const updateSkills = async () => {
    try {
      setLoading(true);
      let skillsArray = Array.isArray(skillsInput)
        ? skillsInput
        : skillsInput
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

      const { data } = await axios.post(
        `https://applicaton-tracker.vercel.app/api/v1/user/update-profile`,
        { skills: skillsArray },
        { withCredentials: true }
      );

      if (data.success) {
        await fetchUserProfile(); // Refresh user from DB
        setShowModal(false);
        alert("Skills updated successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update skills");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-8 bg-[#f0ede746] shadow-xl rounded">
      <div className="flex gap-10">
        <div>
          <img
            src={user.profileImagePath || "/default-avatar.png"}
            alt="Profile"
            className="w-50 h-50  object-cover"
          />
        </div>

        <div className="w-full">
          <h1 className="my-4 text-xl font-semibold">My Profile</h1>
          <hr className="my-1 text-slate-300" />

          <h2 className="font-semibold">
            Name:{" "}
            <span className="font-normal ml-4">
              {user.firstName} {user.lastName}
            </span>
          </h2>

          <h2 className="font-semibold">
            Email: <span className="font-normal ml-4">{user.email}</span>
          </h2>

          <h2 className="font-semibold flex items-center gap-2">
            Skills:{" "}
            <span className="font-normal ml-4">
              {localSkills.length > 0 ? localSkills.join(", ") : "N/A"}
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
            >
              Edit
            </button>
          </h2>

          <h2 className="font-semibold">
            Applications: <span className="font-normal ml-4">{stat}</span>
          </h2>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Update Skills</h2>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="Enter skills separated by commas"
              className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={updateSkills}
                className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
