const user = require('../models/user.model');
const { status_codes, status_message } = require('../utils/codeAndmessage');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { generateOTP, sendmail } = require('../utils/send_mail');
const BASEURL = require('../utils/constant');
const jwt = require('jsonwebtoken');

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
        const { otp, expirationTime, generate_time } = generateOTP();
        sendmail(email, otp)

        const data = await user.create({
            email,
            otp_history: [{
                otp: otp,
                expiration_Time: expirationTime,
                generate_time: generate_time
            }]
        });

        res.status(status_codes.OK).json({
            success: true,
            status: status_codes.OK,
            message: status_message.SEND_OTP,
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

exports.resendmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.EMAIL_REQUIRED
            })
        }
        const checkmail = await user.findOne({ email });
        // console.log(checkmail);

        if (!checkmail) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.EMAIL_NOT_FOUND
            })
        }
        const { otp, expirationTime } = generateOTP()
        sendmail(email, otp)

        if (checkmail.otp_history.length >= 5) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.MAXIMUM_OTP_ATTEMPTS
            })
        }
        // const db_otp = checkmail.otp_history
        // const letestotp = db_otp[db_otp.length - 1];
        // const letest_time = new Date();
        // const twelveHoursInMs = 12 * 60 * 60 * 1000;
        // const lastOtpexpiration_Time = new Date(letestotp.expiration_Time);


        // if (letest_time.getTime() > lastOtpexpiration_Time.getTime() + twelveHoursInMs) {
        //     return res.status(status_codes.BAD_REQUEST).json({
        //         success: false,
        //         status: status_codes.BAD_REQUEST,
        //         message: status_message.OTP_VALIDATION
        //     })
        // }
        checkmail.otp_history.push({
            otp: otp,
            expiration_Time: expirationTime
        })
        await checkmail.save();
        res.status(status_codes.OK).json({
            success: true,
            status: status_codes.OK,
            message: status_message.SEND_OTP,
            data: checkmail,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

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
        // console.log("chackmail",chackmail.otp_history.expiration_Time);

        const db_otp = chackmail.otp_history
        const letestotp = db_otp[db_otp.length - 1];
        // console.log(letestotp.otp);


        if (!chackmail) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PHONE_NOT_FOUND,
            });
        }

        if (otp !== letestotp.otp) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.INVALID_OTP,
            });
        }
        const naw = new Date();
        // console.log(naw);
        // console.log(letestotp);

        // if (naw > letestotp.expiration_Time) {
        //     return res.status(status_codes.BAD_REQUEST).json({
        //         success: false,
        //         status: status_codes.BAD_REQUEST,
        //         message: status_message.OTP_EXPIRE,
        //     });
        // }

        const data = chackmail.otp_history;
        const otpdata = data.map(tt => {
            tt.otp = null,
            tt.expiration_Time = null;
            return tt
        });
        console.log("otpdata", otpdata);


        // chackmail.otp_history.otp = null;
        // chackmail.otp_history.expiration_Time = null;
        // chackmail.otp_history.otp_verify = true
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

        const checkragister = await user.findOne({ email: email, ragistered: true })
        if (checkragister) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.USER_ALREADY_RAGISTER,
            });
        }
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
        const checkmail = await user.findOne({ email: email, otp_verify: true });
        if (!checkmail) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.EMAIL_NOT_FOUND,
            });
        }

        const hashed = await bcrypt.hash(password, 10);
        checkmail.name = name
        checkmail.email = email
        checkmail.password = hashed
        checkmail.age = age
        checkmail.gender = gender
        checkmail.phone = phone
        checkmail.password = hashed
        checkmail.userimage = req.file ? BASEURL + req.file.path.replace(/\\/g, '/') : ''
        checkmail.ragistered = true

        const newuserdata = await checkmail.save();
        return res.status(status_codes.CREATE).json({
            newuserdata,
            success: true,
            status: status_codes.CREATE,
            message: status_message.USER_CREATE_SUCCESS,
        });
    } catch (error) {
        console.error("ragister error:", error);
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkmail = await user.findOne({ email });
        if (!checkmail) {
            return res.status(status_codes.NOT_FOUND).json({ success: false, status: status_codes.NOT_FOUND, message: status_message.USER_NOT_FOUND })
        }
        const chackpassword = await bcrypt.compare(password, checkmail.password);
        if (!chackpassword) {
            return res.status(status_codes.BAD_REQUEST).json({ success: false, status: status_codes.BAD_REQUEST, message: status_message.INVALID_PASSWORD })
        }

        const token = jwt.sign({ data: checkmail.id }, process.env.jwtsecret, { expiresIn: '1h' });
        return res.status(status_codes.OK).json({
            checkmail,
            token,
            success: true, status: status_codes.OK,
            message: status_message.USER_LOGIN_SUCCESS
        });

    } catch (error) {
        console.error("login error:", error);
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}