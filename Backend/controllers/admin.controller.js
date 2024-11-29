import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getRegistrations = async (req, res) => {
  try {
    const { status } = req.query;
    let query = { college: { $ne: "kluniversity" } };

    if (status && status !== "all") {
      query.paymentStatus = status;
    }

    const registrations = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const registration = await User.findById(id);
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }

    if (status === "approved") {
      // Get the plain password from registrationData
      const plainPassword = registration.registrationData?.originalPassword;

      console.log("Debug - Plain password:", plainPassword); // Debug log

      if (!plainPassword) {
        return res
          .status(400)
          .json({ error: "No password found in registration data" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      console.log("Debug - Password being set:", {
        plainPassword,
        hashedPassword,
      });

      // Update user
      registration.password = hashedPassword;
      registration.paymentStatus = "approved";
      registration.isApproved = true;

      // Save and log the result
      const savedUser = await registration.save();
      console.log("Debug - Saved user password:", savedUser.password);
    } else if (status === "rejected") {
      registration.paymentStatus = "rejected";
      registration.isApproved = false;
      await registration.save();
    }

    res.status(200).json({
      _id: registration._id,
      email: registration.email,
      college: registration.college,
      paymentStatus: registration.paymentStatus,
    });
  } catch (error) {
    console.error("Error in updateRegistration:", error);
    res.status(500).json({ error: error.message });
  }
};
