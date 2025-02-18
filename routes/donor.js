const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController.js");
const middleware = require("../middleware/index.js");
const multer = require("multer");

// Set storage engine for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// Initialize multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB size limit
});

// Donor dashboard
router.get("/donor/dashboard", middleware.ensureDonorLoggedIn, donorController.getDashboard);

// Donor equipment donation form
router.get("/donor/donate", middleware.ensureDonorLoggedIn, donorController.getDonateForm);
router.post("/donor/donate", middleware.ensureDonorLoggedIn, upload.single("image"), donorController.postDonate);

// Edit equipment donation
router.get("/donor/equipments/:id/edit", middleware.ensureDonorLoggedIn, donorController.getEditEquipment);

// Update equipment donation
router.put("/donor/equipments/:id", middleware.ensureDonorLoggedIn, upload.single("equipment[image]"), donorController.updateEquipment);

// Delete equipment donation
router.delete("/donor/equipments/:id", middleware.ensureDonorLoggedIn, donorController.deleteEquipment);

// View pending donations
router.get("/donor/donations/pending", middleware.ensureDonorLoggedIn, donorController.getPendingDonations);

// View previously collected donations
router.get("/donor/donations/previous", middleware.ensureDonorLoggedIn, donorController.getPreviousDonations);

// Delete rejected donation
router.get("/donor/donation/deleteRejected/:donationId", middleware.ensureDonorLoggedIn, donorController.deleteRejectedDonation);

// Donor profile view
router.get("/donor/profile", middleware.ensureDonorLoggedIn, donorController.getProfile);

// Update donor profile
router.put("/donor/profile", middleware.ensureDonorLoggedIn, donorController.updateProfile);

module.exports = router;
