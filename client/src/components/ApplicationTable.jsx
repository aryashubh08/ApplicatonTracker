import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { removeApplication } from "../store/slices/applicationSlice";
import { Link } from "react-router-dom";

const ApplicationsTable = ({ refetch, applications }) => {
  const dispatch = useDispatch();

  // ✅ GUARANTEED SAFE DATE FORMATTER
  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "N/A";

    return parsedDate.toLocaleDateString("en-IN");
  };

  const deleteHandler = async (applicationId) => {
    try {
      const { data } = await axios.delete(
        `https://applicaton-tracker.vercel.app/api/v1/application/delete/${applicationId}`,
        { withCredentials: true }
      );

      if (data.success) {
        dispatch(removeApplication(applicationId));
        refetch();
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="mt-8 bg-white/80 backdrop-blur rounded border border-gray-200 shadow-lg">
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Job Applications
        </h2>
        <span className="text-sm text-gray-500">
          Total: {applications?.length || 0}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">
                Job Title
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">
                Company
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">
                Applied Date
              </th>
              <th className="px-6 py-4 text-right font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {applications && applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app._id} className="group hover:bg-gray-50 transition">
                  {/* JOB */}
                  <td className="px-6 py-5 font-medium text-gray-900">
                    {app.jobTitle}
                  </td>

                  {/* COMPANY */}
                  <td className="px-6 py-5 text-gray-600">{app.companyName}</td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold
                        ${
                          app.status === "Offer"
                            ? "bg-green-100 text-green-700"
                            : app.status === "Interview Scheduled"
                            ? "bg-yellow-100 text-yellow-700"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  {/* DATE ✅ GUARANTEED */}
                  <td className="px-6 py-5 text-gray-500">
                    {formatDate(app.appliedDate || app.createdAt)}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5 text-right">
                    <div className="inline-flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <Link
                        to={`/update/${app._id}`}
                        className="px-3 py-1.5 rounded-lg text-blue-600 hover:bg-blue-50 font-medium"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteHandler(app._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-16 text-center text-gray-400">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
