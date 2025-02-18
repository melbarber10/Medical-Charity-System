const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

// GET /auth/signup
exports.getSignup = (req, res) => {
  res.render("auth/signup", { title: "User Signup" });
};

// POST /auth/signup
exports.postSignup = async (req, res) => {
  const { firstName, lastName, email, password1, password2, role } = req.body;
  let errors = [];

  if (!firstName || !lastName || !email || !password1 || !password2) {
    errors.push({ msg: "Please fill in all the fields" });
  }
  if (password1 !== password2) {
    errors.push({ msg: "Passwords are not matching" });
  }
  if (password1.length < 4) {
    errors.push({ msg: "Password length should be at least 4 characters" });
  }
  if (errors.length > 0) {
    return res.render("auth/signup", {
      title: "User Signup",
      errors,
      firstName,
      lastName,
      email,
      password1,
      password2,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      errors.push({ msg: "This Email is already registered. Please try another email." });
      return res.render("auth/signup", {
        title: "User Signup",
        errors,
        firstName,
        lastName,
        email,
        password1,
        password2,
      });
    }

    const newUser = new User({ firstName, lastName, email, password: password1, role });
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    await newUser.save();
    req.flash("success", "You are successfully registered and can log in.");
    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    req.flash("error", "Some error occurred on the server.");
    res.redirect("back");
  }
};

// GET /auth/login
exports.getLogin = (req, res) => {
  res.render("auth/login", { title: "User Login" });
};

// POST /auth/login using a custom callback
exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message || "Login failed");
      return res.redirect("/auth/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect(req.session.returnTo || `/${user.role}/dashboard`);
    });
  })(req, res, next);
};

// GET /auth/logout
exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Logged-out successfully");
  res.redirect("/");
};
