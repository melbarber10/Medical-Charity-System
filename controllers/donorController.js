const User = require("../models/user.js");
const Equipment = require("../models/equipment.js");
const path = require("path");
const fs = require("fs");

exports.getDashboard = async (req, res) => {
  try {
    const donorId = req.user._id;
    const numMedicalRequests = await Equipment.countDocuments({ donor: donorId, category: "medical equipment" });
    const numClothesRequests = await Equipment.countDocuments({ donor: donorId, category: "clothes" });
    const numMedicineRequests = await Equipment.countDocuments({ donor: donorId, category: "medicine" });
    const numPendingRequests = await Equipment.countDocuments({ donor: donorId, status: "pending" });
    const numAcceptedRequests = await Equipment.countDocuments({ donor: donorId, status: "accepted" });
    const numAssignedRequests = await Equipment.countDocuments({ donor: donorId, status: "assigned" });
    const numCollectedRequests = await Equipment.countDocuments({ donor: donorId, status: "collected" });

    res.render("donor/dashboard", {
      title: "Dashboard",
      numPendingRequests,
      numAcceptedRequests,
      numAssignedRequests,
      numCollectedRequests,
      numMedicalRequests,
      numClothesRequests,
      numMedicineRequests
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Error loading dashboard.");
    res.redirect("back");
  }
};

exports.getDonateForm = (req, res) => {
  res.render("donor/donate", { title: "Donate Equipment" });
};

exports.postDonate = async (req, res) => {
  try {
    const equipment = req.body.equipment;
    equipment.status = "pending";
    equipment.donor = req.user._id;
    if (req.file) {
      equipment.image = `/uploads/${req.file.filename}`;
    }
    const newEquipment = new Equipment(equipment);
    await newEquipment.save();
    req.flash("success", "Donation request sent successfully.");
    res.redirect("/donor/donations/pending");
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.getEditEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      req.flash("error", "Equipment not found.");
      return res.redirect("back");
    }
    res.render("donor/editDonate", { equipment });
  } catch (err) {
    console.error(err);
    req.flash("error", "An error occurred.");
    res.redirect("back");
  }
};

exports.updateEquipment = async (req, res) => {
  try {
    const equipmentId = req.params.id;
    const updates = req.body.equipment;

    if (req.file) {
      const equipment = await Equipment.findById(equipmentId);
      if (equipment.image) {
        const oldImagePath = path.join(__dirname, "..", "public", equipment.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updates.image = `/uploads/${req.file.filename}`;
    }

    const updatedEquipment = await Equipment.findByIdAndUpdate(
      equipmentId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedEquipment) {
      req.flash("error", "Equipment not found.");
      return res.redirect("back");
    }

    req.flash("success", "Equipment updated successfully.");
    res.redirect("/donor/donations/pending");
  } catch (err) {
    console.error(err);
    req.flash("error", "An error occurred while updating the equipment.");
    res.redirect("back");
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!deletedEquipment) {
      req.flash("error", "Equipment not found.");
      return res.redirect("back");
    }
    req.flash("success", "Equipment deleted successfully.");
    res.redirect("/donor/donations/pending");
  } catch (err) {
    console.error(err);
    req.flash("error", "An error occurred while deleting the equipment.");
    res.redirect("back");
  }
};

exports.getPendingDonations = async (req, res) => {
  try {
    const selectedCategory = req.query.category || "";
    const filter = { donor: req.user._id, status: "pending" };
    if (selectedCategory) {
      filter.category = selectedCategory;
    }
    const pendingRequests = await Equipment.find(filter).populate("agent");
    res.render("donor/pendingDonations", {
      title: "Pending Requests",
      pendingRequests,
      selectedCategory
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Could not load pending requests. Please try again.");
    res.redirect("back");
  }
};

exports.getPreviousDonations = async (req, res) => {
  try {
    const previousRequests = await Equipment.find({ donor: req.user._id, status: "collected" }).populate("agent");
    res.render("donor/previousDonations", { title: "Previous Requests", previousRequests });
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.deleteRejectedDonation = async (req, res) => {
  try {
    const donationId = req.params.donationId;
    await Equipment.findByIdAndDelete(donationId);
    res.redirect("/donor/donations/pending");
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

exports.getProfile = (req, res) => {
  res.render("donor/profile", { title: "My Profile" });
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const updateObj = req.body.donor;
    await User.findByIdAndUpdate(id, updateObj);
    req.flash("success", "Profile updated successfully");
    res.redirect("/donor/profile");
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};
