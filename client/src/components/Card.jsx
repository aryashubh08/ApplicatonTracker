import React from "react";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { removeApplication } from "../store/slices/applicationSlice";
import { useDispatch } from "react-redux";

const Card = ({ card }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ SAFE STATUS COLOR
  const statusColor = () => {
    switch ((card.status || "").toLowerCase()) {
      case "applied":
        return "bg-blue-400 text-white";
      case "interview":
        return "bg-yellow-400 text-black";
      case "rejected":
        return "bg-red-500 text-white";
      case "offer":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://applicaton-tracker.vercel.app/delete/${id}`,
        { withCredentials: true }
      );
      if (data.success) {
        dispatch(removeApplication(id));
        alert("Successfully Deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4 bg-[#f0ede746] shadow-xl rounded my-4">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">{card.jobTitle}</h2>
        <button onClick={() => deleteHandler(card._id)}>
          <IoTrashOutline className="text-red-700 text-xl" />
        </button>
      </div>

      <p>
        <span className="font-semibold">at </span>
        {card.companyName}
      </p>

      <hr className="my-1 text-slate-300" />

      <p
        className={`font-semibold px-2 py-1 mb-4 mt-2 max-w-fit rounded ${statusColor()}`}
      >
        {card.status}
      </p>

      {/* ✅ DATE FIXED */}
      <p className="text-sm">
        Applied on:{" "}
        {card.appliedDate || card.createdAt
          ? new Date(card.appliedDate || card.createdAt).toLocaleDateString(
              "en-IN"
            )
          : "N/A"}
      </p>

      <hr className="my-1 text-slate-300" />

      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/update/${card._id}`)}
          className="bg-[#FD5934] px-5 mt-2 text-white py-1 rounded font-semibold"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;
