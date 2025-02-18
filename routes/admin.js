// routes/admin.js
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index.js");
const adminController = require("../controllers/adminController.js");

router.get("/admin/dashboard", middleware.ensureAdminLoggedIn, adminController.getDashboard);
router.get("/admin/donations/pending", middleware.ensureAdminLoggedIn, adminController.getPendingDonations);
router.get("/admin/donations/previous", middleware.ensureAdminLoggedIn, adminController.getPreviousDonations);
router.get("/admin/donations/view/:equipmentId", middleware.ensureAdminLoggedIn, adminController.viewDonation);
router.get("/admin/donations/accept/:equipmentId", middleware.ensureAdminLoggedIn, adminController.acceptDonation);
router.get("/admin/donations/reject/:equipmentId", middleware.ensureAdminLoggedIn, adminController.rejectDonation);
router.get("/admin/donations/assign/:equipmentId", middleware.ensureAdminLoggedIn, adminController.getAssignAgent);
router.post("/admin/donations/assign/:equipmentId", middleware.ensureAdminLoggedIn, adminController.postAssignAgent);
router.get("/admin/agents", middleware.ensureAdminLoggedIn, adminController.getAgents);
router.get("/admin/profile", middleware.ensureAdminLoggedIn, adminController.getProfile);
router.put("/admin/profile", middleware.ensureAdminLoggedIn, adminController.updateProfile);

module.exports = router;
