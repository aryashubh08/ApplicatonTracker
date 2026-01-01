import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading, setUser } from "../store/slices/authSlice";
import { USER_API_END_POINT } from "../utils/constant"; // 👈 safer import

const Login = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const response = await axios.post(
        `https://applicaton-tracker.vercel.app/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { data } = response;

      if (data?.success) {
        dispatch(setUser(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data?.message || "Login failed");
      }
    } catch (error) {
      console.error("LOGIN ERROR 👉", error);

      // ✅ Proper error message from backend
      if (error.response) {
        alert(error.response.data?.message || "Invalid credentials");
      } else if (error.request) {
        alert("Server not responding. Please try again later.");
      } else {
        alert(error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md shadow-xl border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5 text-center">Log In</h1>

        <div className="my-3 flex flex-col gap-1">
          <label>Email</label>
          <input
            type="email"
            placeholder="email address"
            value={input.email}
            name="email"
            onChange={changeHandler}
            className="border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="my-3 flex flex-col gap-1">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={input.password}
            name="password"
            onChange={changeHandler}
            className="border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !input.email || !input.password}
          className={`w-full my-3 px-5 py-2 rounded-lg font-semibold text-white ${
            loading ? "bg-gray-400" : "bg-[#FD5934]"
          }`}
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <span className="text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
