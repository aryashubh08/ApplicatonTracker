import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setSingleApplication } from "../store/slices/applicationSlice";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { loading } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    jobTitle: "",
    companyName: "",
    jobPortal: "",
    appliedDate: "",
    interviewDate: "",
    status: "",
    notes: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${APPLICATION_API_END_POINT}/update/${id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        dispatch(setSingleApplication(data.applications));
        alert("updated successfully");
        navigate("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <h1 className="font-semibold text-xl my-4">Edit Application</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={input.jobTitle}
              onChange={changeHandler}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Frontend Developer"
              required
            />
          </div>

          {/* Company Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={input.companyName}
              onChange={changeHandler}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Google"
              required
            />
          </div>

          {/* Job Portal */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Job Portal</label>
            <input
              type="text"
              name="jobPortal"
              value={input.jobPortal}
              onChange={changeHandler}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="LinkedIn"
              required
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Status</label>
            <select
              name="status"
              value={input.status}
              onChange={changeHandler}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white"
              required
            >
              <option value="">Select status</option>
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Applied Date */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">
              Applied Date
            </label>
            <input
              type="date"
              name="appliedDate"
              value={input.appliedDate}
              onChange={changeHandler}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              required
            />
          </div>

          {/* Interview Date */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">
              Interview Date
            </label>
            <input
              type="date"
              name="interviewDate"
              value={input.interviewDate}
              onChange={changeHandler}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 text-gray-600 font-medium">Notes</label>
            <textarea
              name="notes"
              value={input.notes}
              onChange={changeHandler}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
              placeholder="Any additional notes..."
              rows={3}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            type="submit"
            className={`w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Please wait..." : "Add Application"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
