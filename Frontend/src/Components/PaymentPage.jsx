import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import qr from "../assets/qr.png";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentImage, setPaymentImage] = useState(null);
  const [showApprovalMessage, setShowApprovalMessage] = useState(false);
  const formData = location.state?.formData;

  React.useEffect(() => {
    if (!formData || formData.college === "kluniversity") {
      navigate("/register");
    }
  }, [formData, navigate]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "midland");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/vishnu2005/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let paymentImageUrl = "";
      if (paymentImage) {
        paymentImageUrl = await handleImageUpload(paymentImage);
      }

      const dataToSubmit = {
        ...formData,
        paymentId: transactionId,
        college: formData.otherCollegeName,
        paymentScreenshot: paymentImageUrl,
      };

      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // For non-KLU students, show pending message
      if (data.paymentStatus === "pending") {
        setShowApprovalMessage(true);
      } else {
        // For KLU students, proceed with login
        setToken(data.token);
        setUser({
          fullName: data.fullName,
          email: data.email,
          college: data.college,
          collegeId: data.collegeId,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showApprovalMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 p-4 sm:p-8 rounded-lg backdrop-blur-sm w-full max-w-md text-center">
          <h2 className="text-2xl sm:text-3xl font-saint-carell text-white mb-4 sm:mb-6">
            Registration Pending
          </h2>
          <div className="text-white space-y-3 sm:space-y-4 text-sm sm:text-base">
            <p>Your registration is currently pending admin approval.</p>
            <p>Please wait while we verify your payment details.</p>
            <p>You will be notified once your registration is approved.</p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 sm:mt-8 bg-purple-600 text-white py-2 px-4 sm:px-6 rounded text-sm sm:text-base hover:bg-purple-700 transition duration-300 w-full sm:w-auto"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 sm:px-6 lg:px-8">
      <div className="bg-white/10 p-4 sm:p-8 rounded-lg backdrop-blur-sm w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-saint-carell text-white text-center mb-6 sm:mb-8">
          Complete Payment
        </h2>

        <div className="mb-6 sm:mb-8">
          <img
            src={qr}
            alt="Payment QR Code"
            className="w-full max-w-[200px] sm:max-w-xs mx-auto"
          />
          <p className="text-white text-center mt-3 sm:mt-4 text-sm sm:text-base">
            Scan QR code to pay ₹500
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="transactionId"
              className="block text-white mb-2 text-sm sm:text-base"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white text-sm sm:text-base"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="paymentScreenshot"
              className="block text-white mb-2 text-sm sm:text-base"
            >
              Payment Screenshot
            </label>
            <input
              type="file"
              id="paymentScreenshot"
              accept="image/*"
              onChange={(e) => setPaymentImage(e.target.files[0])}
              className="w-full px-3 sm:px-4 py-2 rounded bg-black border border-white/20 text-white focus:outline-none focus:border-white text-sm sm:text-base"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300 disabled:opacity-50 text-sm sm:text-base mt-4 sm:mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
