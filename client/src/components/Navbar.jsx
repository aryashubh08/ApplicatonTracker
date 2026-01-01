import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../store/slices/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutHandler = async (e) => {
    try {
      const { data } = await axios.get(
        `https://applicaton-tracker.vercel.app/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        dispatch(setUser(null));
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#ebe8e1] w-full h-20 flex items-center justify-between px-10">
      <Link to="/" className=" text-xl font-bold">
        <img src="/LOGO.png" alt="" className="h-15" />
      </Link>
      <div className="flex items-center justify-center gap-10">
        <Link to="/dashboard" className="">
          Dashboard
        </Link>
        <Link to="/application" className="">
          Add Application
        </Link>
        <Link to="/profile" className="">
          Profile
        </Link>
        {/* 🔥 CONDITIONAL BUTTON */}
        {user ? (
          <button
            onClick={logOutHandler}
            className="bg-[#FD5934] px-5 text-white py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-[#FD5934] px-5 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
