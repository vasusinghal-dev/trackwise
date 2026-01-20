// components/onboarding/AddApplicationScreen.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BriefcaseIcon, Building, Calendar, Target } from "lucide-react";
import { FiBriefcase } from "react-icons/fi";

interface AddApplicationScreenProps {
  onCreate: () => void;
}

export default function AddApplicationScreen({
  onCreate,
}: AddApplicationScreenProps) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    deadline: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the application
    console.log("Creating application:", formData);
    onCreate();
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen px-4"
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <BriefcaseIcon className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Add Your First Application
          </h2>
          <p className="text-gray-600">
            Start tracking your job search journey
          </p>
        </div>

        <div ref={formRef}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 mr-2" />
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Role Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4 mr-2" />
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter job role"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Status Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FiBriefcase className="w-4 h-4 mr-2" />
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Deadline Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Deadline (Optional)
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Application
            </button>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
