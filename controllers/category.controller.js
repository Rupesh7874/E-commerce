const path = require('path');
const fs = require('fs');
const { status_codes, status_message } = require('../utils/codeAndmessage');
const BASEURL = require('../utils/constant');
const categorymodel = require('../models/category.model');



exports.addcategory = async (req, res) => {
    try {
        const { category_name, description, categoryimage } = req.body;
        const chackcat = await categorymodel.findOne({ category_name });
        if (chackcat) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.CATEGORY_ALREADY_EXISCT
            });
        }

        const newdata = await categorymodel.create({
            category_name: category_name,
            description: description,
            categoryimage: req.file ? BASEURL + req.file.path.replace(/\\/g, '/') : ''
        })
        if (!newdata) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.CATEGORY_NOT_SAVE
            });
        }
        return res.status(status_codes.CREATE).json({ newdata, success: true, status: status_codes.CREATE, message: status_message.CATEGORY_CREATE_SUCESSFULLY });
    } catch (error) {
        console.error("addcategory error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

exports.viewAllCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const parpage = parseInt(req.query.parpage) || 10;
        const searchdata = req.query.search || '';

        const totaldata = await categorymodel.countDocuments();
        const checkcat = await categorymodel.find({
            $or: [
                { category_name: { $regex: searchdata, $options: "i" } }
            ]
        }).skip((page - 1) * parpage)
            .limit(parpage)
            .sort({ createdAt: -1 });


        return res.status(status_codes.CREATE).json({
            data: checkcat,
            page,
            parpage,
            totalPage: Math.ceil(totaldata / parpage),
            totaldata,
            success: true,
            status: status_codes.CREATE,
            message: status_message.CATEGORY_CREATE_SUCESSFULLY
        });
    } catch (error) {
        console.error("viewAllCategory error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}