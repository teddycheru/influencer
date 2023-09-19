const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const user = require("../controllers/userController.js");
const { uploadImages } = require("../middleware/uploadImage");

router.get("/profile/get", isAuthenticated, user.getProfile);

router.post(
  "/profile/update",
  [isAuthenticated, uploadImages],
  user.updateProfile
);
router.post("/password/update", isAuthenticated, user.updatePassword);
router.get("/mark-premium", isAuthenticated, user.makePremium);

module.exports = router;
