const express = require("express");
const { roleController } = require("../../controllers");
const router = express.Router();
const validate = require("../../middlewares/validate");
const { roleValidation } = require("../../validations");


router.post("/create/new", validate(roleValidation.createRole), roleController.createRole);

module.exports = router;