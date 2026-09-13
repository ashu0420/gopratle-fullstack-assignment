const express = require("express");

const {
    createRequirement,
} = require("../controllers/requirementController");

const router = express.Router();

router.post("/", createRequirement);

module.exports = router;