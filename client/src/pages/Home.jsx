import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplications } from "../store/slices/applicationSlice";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import Card from "../components/Card";

const Home = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { allApplications } = useSelector((state) => state.app);
  console.log(allApplications);
  const getAllApplication = async () => {
    try {
      const { data } = await axios.get(
        `https://applicaton-tracker.vercel.app/api/v1/application/get`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        dispatch(setAllApplications(data.applications));
        // console.log("Applications fetched:", data.applications);
      }
    } catch (error) {
      console.log("Fetch listings failed:", error.message);
    }
  };
  useEffect(() => {
    if (user) {
      getAllApplication();
    } else {
      // clear applications on logout
      dispatch(setAllApplications([]));
    }
  }, [user, dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="mt-4 text-lg font-medium">Your Applications:</h2>
      {allApplications?.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 ">
          {allApplications.map((app) => (
            <Card card={app} />
          ))}
        </div>
      ) : (
        <p>No applications found, Please Login first.</p>
      )}
    </div>
  );
};

export default Home;
