const status_codes = {
    OK: 201,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
}
const status_message = {
    OK: "Create",
    NOT_FOUND: "Not found",
    BAD_REQUEST: "Invalid request. Please check your input data.",
    INTERNAL_SERVER_ERROR: "Internal server error",
}




module.exports = { status_codes, status_message }