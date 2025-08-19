const subcategorymodel = require('../models/subcategory.model');
const { status_codes, status_message } = require('../utils/codeAndmessage');



exports.addsubcategory = async (req, res) => {
    try {
        const { subcategory_name, description } = req.body
        if (!subcategory_name) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_NAME_REQUIRE
            });
        }
        if (!description) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.DESCRIPTION_REQUIRE
            });
        }
        const chackdata = await subcategorymodel.findOne({ subcategory_name });
        if (chackdata) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_ALREADY_EXISCT
            });
        }
        const subcategorydata = {
            subcategory_name: subcategory_name,
            description: description
        }
        const newsuncategorydata = await subcategorymodel.create(subcategorydata);
        if (!newsuncategorydata) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_NOT_SAVE
            });
        }
        return res.status(status_codes.CREATE).json({ newsuncategorydata, success: true, status: status_codes.CREATE, message: status_message.SUBCATEGORY_CREATE_SUCCESS });
    } catch (error) {
        console.error("addsubcategory error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

exports.getallsubcategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const parpage = parseInt(req.query.parpage) || 10;
        const search = req.query.search || "";

        const totaldata = await subcategorymodel.countDocuments();
        const subcatdata = await subcategorymodel.find({
            $or: [
                { subcategory_name: { $regex: search, $options: "i" } }
            ]
        }).skip((page - 1) * parpage).limit(parpage).sort({ createdAt: -1 })

        if (!subcatdata) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_NOT_FOUND
            });
        }

        res.status(status_codes.OK).json({
            data: subcatdata,
            page,
            parpage,
            totalpage: Math.ceil(totaldata / parpage),
            totaldata,
            success: true,
            status: status_codes.OK,
            message: status_message.SUBCATEGORY_GET_SUCCESS,
        });
    } catch (error) {
        console.error("getallsubcategory error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}