const user = require('../models/user.model');
const { status_codes, status_message } = require('../utils/codeAndmessage');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

exports.sendmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.EMAIL_REQUIRED,
            });
        }
        const checkmail = await user.findOne({ email });
        if (checkmail) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.EMAIL_ALREADY_EXICST,
            });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "brain.schowalter@ethereal.email",
                pass: "1BB5wHbuFxQh9d3MZS",
            },
        });

        const generateOTP = () => {
            const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Example OTP generation
            const expirationMinutes = 1; // Set your desired expiration time
            const expirationTime = new Date(Date.now() + expirationMinutes * 60 * 1000); // Calculate expiration timestamp

            return { otp, expirationTime };
        };
        const { otp, expirationTime } = generateOTP();
        console.log(otp, expirationTime);


        // Wrap in an async IIFE so we can use await.
        (async () => {
            const info = await transporter.sendMail({
                from: '"Maddison Foo Koch" <brain.schowalter@ethereal.email>',
                to: email,
                subject: "send otp",
                text: otp, // plain‑text body
                html: "<b>Hello world?</b>", // HTML body
            });

            console.log("Message sent:", info.messageId);
        })();

        const data = await user.create({
            email,
            otp: otp,
            expiration_Time: expirationTime
        });

        res.status(status_codes.CREATE).json({
            success: true,
            status: status_codes.CREATE,
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

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.EMAIL_REQUIRED,
            });
        }
        if (!otp) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.OTP_REQUIRED,
            });
        }

        const chackmail = await user.findOne({ email: email });
        // console.log(chackmail);

        if (!chackmail) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PHONE_NOT_FOUND,
            });
        }
        // const checkotp = await user.findOne({ otp: otp });
        if (otp !== chackmail.otp) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.INVALID_OTP,
            });
        }
        const naw = new Date();
        // console.log(naw);
        // console.log(chackmail.expirationTime);

        if (naw > chackmail.expiration_Time) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.OTP_EXPIRE,
            });
        }
        chackmail.otp = null;
        chackmail.expiration_Time = null;
        chackmail.save();

        res.status(status_codes.CREATE).json({
            success: true,
            status: status_codes.OK,
            message: status_message.OTP_VERIFY,
            data: chackmail,
        });
    } catch (error) {
        console.error("verifyotp error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

exports.ragister = async (req, res) => {
    try {
        const { name, email, password, phone, confirmpassword, age, gender, userimage } = req.body;
        if (!name) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.NAME_REQUIRED,
            });
        }
        if (!email) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.EMAIL_REQUIRED,
            });
        }
        if (!password) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.PASSWORD_REQUIRED,
            });
        }
        if (!confirmpassword) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.PASSWORD_REQUIRED,
            });
        }
        if (password !== confirmpassword) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.NOT_SAME__PASSWORD,
            });
        }
        if (!phone) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.PHONE_REQUIRED,
            });
        }
        if (!age) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.AGE_REQUIRED,
            });
        }
        if (!gender) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.GENDER_REQUIRED,
            });
        }
        if (!userimage) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.USERIMAGE_REQUIRED,
            });
        }
        const checkmail = await user.findOne({ email });
        if (!checkmail) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.EMAIL_NOT_FOUND,
            });
        }
        const hashed = await bcrypt.hash(password, 10);
        const newuser = new user({
            name,
            email,
            password: hashed,
            age,
            gender,
            phone,
            userimage: req.file ? BASEURL + req.file.path.replace(/\\/g, '/') : ''
        })
        const newuserdata = await newuser.save();

    } catch (error) {
        console.error("ragister error:", error);
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}