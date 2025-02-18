const User = require("../models/user.js");
const Equipment = require("../models/equipment.js");

exports.getDashboard = async (req, res) => {
  try {
    const agentId = req.user._id;
    const numAssignedEquipment = await Equipment.countDocuments({ agent: agentId, status: "assigned" });
    const numCollectedEquipment = await Equipment.countDocuments({ agent: agentId, status: "collected" });
    res.render("agent/dashboard", {
      title: "Dashboard",
      numAssignedEquipment,
      numCollectedEquipment
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Error loading dashboard.");
    res.redirect("back");
  }
};

exports.getPendingCollections = async (req, res) => {
  try {
    const pendingCollections = await Equipment.find({ agent: req.user._id, status: "assigned" }).populate("donor");
    res.render("agent/pendingCollections", { title: "Pending Collections", pendingCollections });
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.getPreviousCollections = async (req, res) => {
  try {
    const previousCollections = await Equipment.find({ agent: req.user._id, status: "collected" }).populate("donor");
    res.render("agent/previousCollections", { title: "Previous Collections", previousCollections });
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.viewCollection = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const collection = await Equipment.findById(collectionId).populate("donor");
    res.render("agent/collection", { title: "Collection Details", collection });
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.collectEquipment = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    await Equipment.findByIdAndUpdate(collectionId, { status: "collected", collectionTime: Date.now() });
    req.flash("success", "Equipment collected successfully");
    res.redirect(`/agent/collection/view/${collectionId}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.getProfile = (req, res) => {
  res.render("agent/profile", { title: "My Profile" });
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const updateObj = req.body.agent; // e.g., { firstName, lastName, gender, address, phone }
    await User.findByIdAndUpdate(id, updateObj);
    req.flash("success", "Profile updated successfully");
    res.redirect("/agent/profile");
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};
