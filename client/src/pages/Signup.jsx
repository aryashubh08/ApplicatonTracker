import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "../store/slices/authSlice";
import { USER_API_END_POINT } from "../utils/constant";

const Signup = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    file: null,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("email", input.email);
    formData.append("password", input.password);

    if (input.file) {
      formData.append("profileImage", input.file);
    }

    try {
      dispatch(setLoading(true));

      const { data } = await axios.post(
        `https://applicaton-tracker.vercel.app/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (data?.success) {
        alert("Account created successfully");
        navigate("/login");
      } else {
        alert(data?.message || "Signup failed");
      }
    } catch (error) {
      console.error("SIGNUP ERROR 👉", error);

      if (error.response) {
        alert(error.response.data?.message || "Signup failed");
      } else if (error.request) {
        alert("Server not responding");
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
        className="w-full max-w-md border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>

        <div className="my-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={input.firstName}
            onChange={changeHandler}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="my-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={input.lastName}
            onChange={changeHandler}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="my-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="my-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeHandler}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="my-3">
          <label>Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={changeFileHandler}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full my-3 py-2 rounded text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-[#FD5934]"
          }`}
        >
          {loading ? "Please wait..." : "Signup"}
        </button>

        <span className="text-sm block text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
