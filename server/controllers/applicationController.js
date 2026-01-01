const User = require("../models/UserModel");
const Application = require("../models/ApplicationModel");

// CREATE APPLICATION
exports.createApplication = async (req, res) => {
  try {
    const {
      companyName,
      jobTitle,
      jobPortal,
      appliedDate,
      status,
      interviewDate,
      notes,
    } = req.body;

    const userId = req.id;

    if (!companyName || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: "Company name and job title are required",
      });
    }

    // 1. Create the application
    const newApplication = await Application.create({
      user: userId,
      companyName,
      jobTitle,
      jobPortal,
      appliedDate,
      status,
      interviewDate,
      notes,
    });

    // 2. Push application ID to user's applications array
    await User.findByIdAndUpdate(userId, {
      $push: { applications: newApplication._id },
    });

    // 3. Fetch all applications for this user
    const allApplications = await Application.find({ user: userId }).sort({
      createdAt: -1,
    });

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      application: newApplication, // single application
      applications: allApplications, // all applications for the user
    });
  } catch (error) {
    console.error("Create Application Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL APPLICATIONS
exports.getAllApplications = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ user: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get Applications Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE APPLICATION
exports.getSingleApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

    const application = await Application.findOne({ _id: id, user: userId });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Get Application Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE APPLICATION
exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

    const application = await Application.findOne({ _id: id, user: userId });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Update only provided fields
    const {
      companyName,
      jobTitle,
      jobPortal,
      status,
      notes,
      appliedDate,
      interviewDate,
    } = req.body;

    if (companyName) application.companyName = companyName;
    if (jobTitle) application.jobTitle = jobTitle;
    if (jobPortal) application.jobPortal = jobPortal;
    if (status) application.status = status;
    if (notes) application.notes = notes;
    if (appliedDate) application.appliedDate = appliedDate;
    if (interviewDate) application.interviewDate = interviewDate;

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    console.error("Update Application Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE APPLICATION
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

    const application = await Application.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Remove application ID from user's applications array
    await User.findByIdAndUpdate(userId, {
      $pull: { applications: id },
    });

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete Application Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET DASHBOARD DATA
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ user: userId });

    const stats = applications.reduce(
      (acc, app) => {
        acc.total++;
        if (app.status === "Interview Scheduled") acc.interview++;
        else if (app.status === "Rejected") acc.rejected++;
        else if (app.status === "Offer") acc.accepted++;
        return acc;
      },
      { total: 0, interview: 0, rejected: 0, accepted: 0 }
    );

    res.status(200).json({
      success: true,
      stats,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
