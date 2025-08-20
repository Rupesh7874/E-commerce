const { status_codes, status_message } = require('../utils/codeAndmessage');
const productmodel = require('../models/product.model');
const BASEURL = require('../utils/constant');
const path = require('path');
const fs = require('fs');

exports.addproduct = async (req, res) => {
    try {
        const { productname, price, description, discountPrice, productimage, categoryId, subcategoryId } = req.body;
        const checkproduct = await productmodel.findOne({ productname });
        if (checkproduct) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PRODUCT_ALREDY_EXISCT,
            });
        }
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
        if (!categoryId) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.CATEGORY_REQUIRE,
            });
        }
        if (!subcategoryId) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_REQUIRE,
            });
        }
        const imgpath = req.file ? BASEURL + req.file.path.replace(/\\/g, '/') : ''
        const catdata = await productmodel.create({
            productname,
            price,
            description,
            discountPrice,
            productimage: imgpath,
            categoryId,
            subcategoryId
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
            success: true,
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

exports.deleteproduct = async (req, res) => {
    try {
        const productId = req.query.productId;
        const checkmail = await productmodel.findById(productId);

        if (!checkmail) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.USER_NOT_FOUND,
            });
        }
        const imgurl = checkmail.productimage;
        const filename = imgurl.split('/uploads/')[1];
        if (filename) {
            const deleteimg = path.join(__dirname, '..', 'uploads', filename);
            if (fs.existsSync(deleteimg)) {
                fs.unlinkSync(deleteimg);
            }
        }

        const deletedata = await productmodel.findByIdAndDelete(productId, { new: true });
        if (!deletedata) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PRODUCT_NOT_DELETE,
            });
        }
        return res.status(status_codes.OK).json({
            deletedata,
            success: false,
            status: status_codes.OK,
            message: status_message.PRODUCT_DELETE_SUCCESS,
        });
    } catch (error) {
        console.error("deleteproduct error:", error);
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

exports.updateproduct = async (req, res) => {
    try {
        const { productname, price, description, discountPrice, productimage, categoryId, subcategoryId } = req.body;
        const productid = req.query.productId;
        const checkmail = await productmodel.findById(productid);
        if (!checkmail) {
            return res.status(status_codes.NOT_FOUND).json({
                success: false,
                status: status_codes.NOT_FOUND,
                message: status_message.USER_NOT_FOUND,
            });
        }
        const productdata = {
            productname: productname,
            price: price,
            description: description,
            discountPrice: discountPrice,
            productimage: req.file ? BASEURL + req.file.path.replace('/\\/g, ' / '') : '',
            categoryId: categoryId,
            subcategoryId: subcategoryId
        }
        const updatedata = await productmodel.findByIdAndUpdate(productid, productdata);
        if (!updatedata) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.PRODUCT_NOT_UPDATE,
            });
        }
        return res.status(status_codes.OK).json({
            updatedata,
            success: true,
            status: status_codes.OK,
            message: status_message.PRODUCT_UPDATE_SUCCESS,
        });

    } catch (error) {
        console.error("deleteproduct error:", error);
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

exports.getallproduct = async (req, res) => {
    try {
        const productdata = await productmodel.find({ isActive: false });
        console.log(productdata);

    } catch (error) {   
        console.error("getallproduct error:", error);
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}