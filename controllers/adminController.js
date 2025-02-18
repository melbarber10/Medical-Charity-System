const User = require("../models/user.js");
const Equipment = require("../models/equipment.js");

exports.getDashboard = async (req, res) => {
  try {
    const numAdmins = await User.countDocuments({ role: "admin" });
    const numDonors = await User.countDocuments({ role: "donor" });
    const numAgents = await User.countDocuments({ role: "agent" });
    const numPendingEquipment = await Equipment.countDocuments({ status: "pending" });
    const numAcceptedEquipment = await Equipment.countDocuments({ status: "accepted" });
    const numAssignedEquipment = await Equipment.countDocuments({ status: "assigned" });
    const numCollectedEquipment = await Equipment.countDocuments({ status: "collected" });
    const numMedicalDonations = await Equipment.countDocuments({ category: "medical equipment" });
    const numClothesDonations = await Equipment.countDocuments({ category: "clothes" });
    const numMedicineDonations = await Equipment.countDocuments({ category: "medicine" });

    res.render("admin/dashboard", {
      title: "Dashboard",
      numAdmins,
      numDonors,
      numAgents,
      numPendingEquipment,
      numAcceptedEquipment,
      numAssignedEquipment,
      numCollectedEquipment,
      numMedicalDonations,
      numClothesDonations,
      numMedicineDonations
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.getPendingDonations = async (req, res) => {
  try {
    const pendingEquipment = await Equipment.find({
      status: ["pending", "accepted", "assigned"]
    }).populate("donor");
    res.render("admin/pendingDonations", { title: "Pending Donation Requests", pendingEquipment });
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.getPreviousDonations = async (req, res) => {
  try {
    const previousEquipment = await Equipment.find({ status: "collected" }).populate("donor");
    res.render("admin/previousDonations", { title: "Previous Donations", previousEquipment });
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.viewDonation = async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    const equipment = await Equipment.findById(equipmentId).populate("donor").populate("agent");
    res.render("admin/equipment", { title: "Donation Details", equipment });
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.acceptDonation = async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    await Equipment.findByIdAndUpdate(equipmentId, { status: "accepted" });
    req.flash("success", "Donation request accepted successfully");
    res.redirect(`/admin/donations/view/${equipmentId}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.rejectDonation = async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    await Equipment.findByIdAndUpdate(equipmentId, { status: "rejected" });
    req.flash("success", "Donation request rejected successfully");
    res.redirect(`/admin/donations/view/${equipmentId}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.getAssignAgent = async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    const agents = await User.find({ role: "agent" });
    const equipment = await Equipment.findById(equipmentId).populate("donor");
    res.render("admin/assignAgent", { title: "Assign Agent", equipment, agents });
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.postAssignAgent = async (req, res) => {
  try {
    const equipmentId = req.params.equipmentId;
    const { agent, adminToAgentMsg } = req.body;
    await Equipment.findByIdAndUpdate(equipmentId, {
      status: "assigned",
      agent,
      adminToAgentMsg
    });
    req.flash("success", "Agent assigned successfully");
    res.redirect(`/admin/donations/view/${equipmentId}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" });
    res.render("admin/agents", { title: "List of Agents", agents });
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.getProfile = (req, res) => {
  res.render("admin/profile", { title: "My Profile" });
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const updateObj = req.body.admin;
    await User.findByIdAndUpdate(id, updateObj);
    req.flash("success", "Profile updated successfully");
    res.redirect("/admin/profile");
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};
