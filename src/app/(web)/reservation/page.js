"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const ReservationForm = () => {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    people: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Reservation Submitted:", formData);
    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Reservation Response:", data);
      if (response.ok) {
        toast.success("Reservation submitted successfully!");
        setTimeout(() => {
          navigate.push("/");
        }, 1000);
      }
      //navigate to main page
      setIsLoading(false);
    } catch (error) {
      toast.error("error:" + error.message);
    }
    // You can integrate API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-100 p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-800">
          Restaurant Reservation
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Total People</label>
          <input
            type="number"
            name="people"
            min="1"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Timing</label>
          <input
            type="time"
            name="time"
            min="11:00"
            max="00:00"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Reserving..." : "Reserve Now"}
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
