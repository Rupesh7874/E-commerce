const subcategorymodel = require('../models/subcategory.model');
const { status_codes, status_message } = require('../utils/codeAndmessage');



exports.addSubategory = async (req, res) => {
    try {
        const { subcategory_name, description, categoryId } = req.body
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
        if (!categoryId) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.CATEGORY_ID_REQUIRE
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
            categoryId: categoryId,
            subcategory_name: subcategory_name,
            description: description,
        }
        const newsuncategorydata = await subcategorymodel.create(subcategorydata);
        if (!newsuncategorydata) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_NOT_SAVE
            });
        }
        return res.status(status_codes.CREATE).json({
            newsuncategorydata, success: true,
            status: status_codes.CREATE,
            message: status_message.SUBCATEGORY_CREATE_SUCCESS
        });
    } catch (error) {
        console.error("addsubcategory error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

exports.getallSubcategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const parpage = parseInt(req.query.parpage) || 10;
        const search = req.query.search || "";

        const totaldata = await subcategorymodel.countDocuments();
        const subcatdata = await subcategorymodel.find({
            $or: [
                { subcategory_name: { $regex: search, $options: "i" } }
            ]
        }).populate("categoryId","category_name -_id").skip((page - 1) * parpage).limit(parpage).sort({ createdAt: -1 })

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

exports.deleteSubcategorybyId = async (req, res) => {
    try {
        const subcatid = req.query.subcategoryid;
        if (!subcatid) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_IS_REQUIRE
            });
        }
        const checksubcatid = await subcategorymodel.findById(subcatid);
        if (!checksubcatid) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_NOT_FOUND
            });
        }
        const deletesubcat = await subcategorymodel.findByIdAndDelete(subcatid);
        if (!deletesubcat) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_NOT_DELETE
            });
        }
        return res.status(status_codes.OK).json({
            deletesubcat,
            success: true,
            status: status_codes.OK,
            message: status_message.SUBCATEGORY_DELETE_SUCCESS
        });

    } catch (error) {
        console.error("deletesubcategorybyId error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

exports.updateSubcategorybyId = async (req, res) => {
    try {
        const subcatid = req.query.subcategoryid;
        if (!subcatid) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_IS_REQUIRE
            });
        }
        const checksubcatid = await subcategorymodel.findById(subcatid);
        if (!checksubcatid) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_NOT_FOUND
            });
        }
        const updatesubcat = await subcategorymodel.findByIdAndUpdate(subcatid, req.body);
        if (!updatesubcat) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_NOT_UPDATE
            });
        }
        return res.status(status_codes.OK).json({
            updatesubcat,
            success: true,
            status: status_codes.OK,
            message: status_message.SUBCATEGORY_UPDATE_SUCCESS
        });
    } catch (error) {
        console.error("updatesubcategorybyId error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

exports.isActivedeActive = async (req, res) => {
    try {
        const { subcatid, isActive } = req.query;
        if (!subcatid) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.SUBCATEGORY_IS_REQUIRE
            });
        }
        const subcatdata = await subcategorymodel.findByIdAndUpdate(subcatid, { isActive: isActive }, { new: true });

        return res.status(status_codes.OK).json({
            subcatdata,
            success: true,
            status: status_codes.OK,
            isActive: subcatdata?.isActive ?? null,
            message: status_message.SUBCATEGORY_UPDATE_SUCCESS
        });
    } catch (error) {
        console.error("isActivedeActive error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}