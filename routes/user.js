const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/sign", (req, res) => {
  res.render("users/sign.ejs");
});

router.post("/sign", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You See the Record");
      res.redirect("/Patients");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/sign");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash(
      "success",
      "Welcome To City Hospital Record Area You Are Logged In!"
    );
    let redirectUrl = res.locals.redirectUrl || "/Patients";
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logout");
    res.redirect("/Patients");
  });
});

module.exports = router;
