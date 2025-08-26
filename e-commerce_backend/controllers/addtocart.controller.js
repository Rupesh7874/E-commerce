const addtocartmodel = require('../models/addtocart.model');
const { status_codes, status_message } = require('../utils/codeAndmessage');

exports.addaddcart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;
        const checkcart = await addtocartmodel.findOne({ productId, userId });
        if (checkcart) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PRODUCT_ALREADY_EXISCT_IN_CART
            });
        }
        const cartdata = await addtocartmodel.create({
            productId,
            userId
        });
        if (!cartdata) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PRODUCT_NOT_EXISCT_IN_CART
            });
        }
        return res.status(status_codes.CREATE).json({
            cartdata,
            success: true,
            status: status_codes.CREATE,
            message: status_message.CATEGORY_CREATE_SUCCESS
        });
    } catch (error) {
        console.error("addaddcart error:", error);
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

exports.deleteaddcart = async (req, res) => {
    try {
        const userId = req.userId;
        const productId = req.query.productId;

        const checkcart = await addtocartmodel.findOne({ userId, productId });
        if (!checkcart) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PRODUCT_NOT_EXISCT_IN_CART
            });
        }
        const deletecart = await addtocartmodel.deleteOne(checkcart);
        if (!deletecart) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.CART_PRODUCT_NOT_DELETE
            });
        }
        return res.status(status_codes.OK).json({
            success: true,
            status: status_codes.OK,
            message: status_message.CATEGORY_DELETE_SUCCESS
        });
    } catch (error) {
        console.error("addaddcart error:", error);
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}