const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const middleware = require("../middleware/index.js");

router.get("/auth/signup", middleware.ensureNotLoggedIn, authController.getSignup);
router.post("/auth/signup", middleware.ensureNotLoggedIn, authController.postSignup);
router.get("/auth/login", middleware.ensureNotLoggedIn, authController.getLogin);
router.post("/auth/login", middleware.ensureNotLoggedIn, authController.postLogin);
router.get("/auth/logout", authController.logout);

module.exports = router;
