import axios from "axios";
import React, { useEffect } from "react";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplications, setStats } from "../store/slices/applicationSlice";
import ApplicationsTable from "../components/ApplicationTable";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allApplications } = useSelector((state) => state.app);
  const { stats } = useSelector((state) => state.app);
  const getDashboardData = async () => {
    const { data } = await axios.get(
      `https://applicaton-tracker.vercel.app/dashboard`,
      {
        withCredentials: true,
      }
    );

    if (data.success) {
      dispatch(setAllApplications(data.applications));
      dispatch(setStats(data.stats));
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div>
      <div>
        <div className="grid grid-cols-4 gap-4 my-6 text-white font-semibold max-w-7xl mx-auto">
          <div className="p-6 bg-blue-400 rounded">
            Total Applied: <span className="text-xl">{stats.total}</span>
          </div>
          <div className="p-6 bg-yellow-400 rounded">
            Interviews: <span className="text-xl">{stats.interview}</span>
          </div>
          <div className="p-6 bg-red-400 rounded">
            Rejected: <span className="text-xl">{stats.rejected}</span>
          </div>
          <div className="p-6 bg-green-400 rounded">
            Accepted: <span className="text-xl">{stats.accepted}</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8">
        <h1 className="text-md font-semibold">My Applications</h1>
        <ApplicationsTable
          applications={allApplications}
          refetch={getDashboardData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
