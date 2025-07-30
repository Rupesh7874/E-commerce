const user = require('../models/user.model');
const { status_codes, status_message } = require('../utils/codeAndmessage');


exports.login = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: "Email is required",
            });
        }
        const data = await user.create({ email });

        res.status(status_codes.SUCCESS).json({
            success: true,
            status: status_codes.SUCCESS,
            message: "Login successful",
            data: data,
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
};
