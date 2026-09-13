const errorHandler = (error, req, res, next) => {
    console.error(error);

    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Invalid requirement data.",
            errors: Object.values(error.errors).map(
                (item) => item.message
            ),
        });
    }

    return res.status(500).json({
        success: false,
        message: "Something went wrong on the server.",
    });
};

module.exports = errorHandler;