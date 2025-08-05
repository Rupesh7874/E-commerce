const status_codes = {
    OK: 201,
    CREATE: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
}
const status_message = {
    OK: "Create",
    NOT_FOUND: "Not found",
    BAD_REQUEST: "Invalid request. Please check your input data.",
    INTERNAL_SERVER_ERROR: "Internal server error.",
    PHONE_NOT_FOUND: "Phone number not found.Please provide mail thru sendmail.",
    INVALID_OTP: "Invalid otp.",
    OTP_EXPIRE: "Otp exipre.",
    OTP_VERIFY: "Otp verify sucessfully.",
    SEND_OTP: "Otp send sucessfully.",
    OTP_REQUIRED: "Otp required.",
    EMAIL_REQUIRED: "Email is required.",
    EMAIL_NOT_FOUND: "Email not found.please send mail thru sendmail.",
    USER_NOT_FOUND: 'User not found',
    USER_LOGIN_SUCCESS:"User login suceessfully",
    EMAIL_ALREADY_EXICST: "Email alredy exicst.",
    NAME_REQUIRED: "Name is required.",
    USER_ALREADY_RAGISTER:"User already ragister",
    PHONE_REQUIRED: "Phone is required.",
    AGE_REQUIRED: "Age is required.",
    GENDER_REQUIRED: "Gender is required.",
    USERIMAGE_REQUIRED: "User image is required.",
    PASSWORD_REQUIRED: "Password is required.",
    NOT_SAME__PASSWORD: "Password and Confirmpass are not same.",
    CONFIRM_PASSWORD: "Confirm password is required.",
    USER_CREATE_SUCCESS: "User create successfully.",
    PRODUCT_NAME_REQUIRE:"Product name is require",
    PRODUCT_PRICE_REQUIRE:"Product price is require",
    DESCRIPTION_REQUIRE:"Description is require",
    CATEGORY_REQUIRE:"Category is require",
    PRODUCT_NOT_CREATE:"Product not create",
    PRODUCT_CREATE_SUCCESS:"Product create sucessfully"
}




module.exports = { status_codes, status_message }