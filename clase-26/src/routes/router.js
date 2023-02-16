const router = require("express").Router();
const { Index, Main } = require("../controllers/ApiController");
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

router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/faillogin", getFailLogin);

router.get("/signup", getSignup);
router.post("/signup", postSignup);
router.get("/failsignup", getFailSignup);

router.post("/logout", postLogout);

module.exports = router;
