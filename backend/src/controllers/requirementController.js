const Requirement = require("../models/Requirement");

const createRequirement = async (req, res, next) => {
    try {
        const {
            eventName,
            eventType,
            startDate,
            endDate,
            location,
            category,
            details,
        } = req.body;

        if (
            !eventName ||
            !eventType ||
            !startDate ||
            !endDate ||
            !location ||
            !category ||
            !details
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields.",
            });
        }

        if (endDate < startDate) {
            return res.status(400).json({
                success: false,
                message: "End date cannot be before start date.",
            });
        }

        const validEventTypes = [
            "wedding",
            "corporate",
            "concert",
            "private",
            "other",
        ];

        if (!validEventTypes.includes(eventType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event type.",
            });
        }

        const validCategories = [
            "planner",
            "performer",
            "crew",
        ];

        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category.",
            });
        }
        if (category === "planner") {
            const { services, guestCount, budget, planningStage } = details;

            if (!services || !guestCount || !budget || !planningStage) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Planner requirements must include services, guest count, budget, and planning stage.",
                });
            }
        }

        if (category === "performer") {
            const {
                performanceType,
                genre,
                performerCount,
                duration,
                budget,
            } = details;

            if (
                !performanceType ||
                !genre ||
                !performerCount ||
                !duration ||
                !budget
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Performer requirements must include performance type, genre, performer count, duration, and budget.",
                });
            }
        }

        if (category === "crew") {
            const {
                role,
                numberRequired,
                experienceLevel,
                duration,
                budget,
            } = details;

            if (
                !role ||
                !numberRequired ||
                !experienceLevel ||
                !duration ||
                !budget
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Crew requirements must include role, number required, experience level, duration, and budget.",
                });
            }
          }
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
const getRequirements = async (req, res, next) => {
    try {
        const requirements = await Requirement.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: requirements.length,
            data: requirements,
        });
    } catch (error) {
        next(error);
    }
  };
module.exports = {
    createRequirement,
    getRequirements,
  };