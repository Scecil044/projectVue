const express = require("express");
const { authController, userController } = require("../../controllers");
const router = express.Router();
const validate = require("../../middlewares/validate");
const { userValidation } = require("../../validations");


router.post("/login", authController.loginClient);

router.post("/register", validate(userValidation.createUser), userController.createUser);

module.exports = router;