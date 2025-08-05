const { status_codes, status_message } = require('../utils/codeAndmessage');
const sellermodel = require('../models/seller.model');
const BASEURL = require('../utils/constant')

exports.addproduct = async (req, res) => {
    try {
        const { productname, price, description, discountPrice, productimage, category } = req.body;
        if (!productname) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PRODUCT_NAME_REQUIRE,
            });
        }
        if (!price) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PRODUCT_PRICE_REQUIRE,
            });
        }
        if (!description) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.DESCRIPTION_REQUIRE,
            });
        }
        if (!category) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.CATEGORY_REQUIRE,
            });
        }
        const imgpath = req.file ? BASEURL + req.file.path.replace(/\\/g, '/') : ''
        const catdata = await sellermodel.create({
            productname,
            price,
            description,
            discountPrice,
            productimage: imgpath,
            category
        });
        if (!catdata) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PRODUCT_NOT_CREATE,
            });
        }
        return res.status(status_codes.CREATE).json({
            catdata,
            success: false,
            status: status_codes.CREATE,
            message: status_message.PRODUCT_CREATE_SUCCESS,
        });
    } catch (error) {
        console.error("addproduct error:", error);
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}