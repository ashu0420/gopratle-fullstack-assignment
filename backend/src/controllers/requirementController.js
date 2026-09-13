const Requirement = require("../models/Requirement");

const createRequirement = async (req, res, next) => {
    try {
        const requirement = await Requirement.create(req.body);

        res.status(201).json({
            success: true,
            message: "Requirement created successfully",
            data: requirement,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRequirement,
};