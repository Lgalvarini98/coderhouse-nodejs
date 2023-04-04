const router = require("express").Router();
const compression = require("compression");
const passport = require("passport");

const { Index, Main, Info } = require("../controllers/ApiController");
const {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  postLogout,
  getFailLogin,
  getFailSignup,
} = require("../controllers/AuthController");

router.get("/", Index);
router.get("/main", Main);

router.get("/info", Info);

router.get("/infozip", compression(), Info);

router.get("/login", getLogin);
router.post("/login", postLogin);
// router.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), postLogin);
router.get("/faillogin", getFailLogin);

router.get("/signup", getSignup);
router.post("/signup", postSignup);
// router.post("/signup", passport.authenticate("signup", { failureRedirect: "/failsignup" }), postSignup);
router.get("/failsignup", getFailSignup);

router.post("/logout", postLogout);

module.exports = router;
