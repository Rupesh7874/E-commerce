const path = require('path');
const fs = require('fs');
const { status_codes, status_message } = require('../utils/codeAndmessage');
const BASEURL = require('../utils/constant');
const categorymodel = require('../models/category.model');



exports.addcategory = async (req, res) => {
    try {
        const { category_name, description, categoryimage } = req.body;
        if (!category_name) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.CATEGORY_NAME_REQUIRE
            });
        }
        if (!description) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.DESCRIPTION_REQUIRE
            });
        }

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
        return res.status(status_codes.CREATE).json({ newdata, success: true, status: status_codes.CREATE, message: status_message.CATEGORY_CREATE_SUCCESS });
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

exports.updatecategory = async (req, res) => {
    try {
        const { category_name, description, categoryimage } = req.body;
        const catid = req.query.category_Id
        const categoryaimge = req.file;

        if (!category_name) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.CATEGORY_NAME_REQUIRE
            });
        }
        if (!description) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.DESCRIPTION_REQUIRE
            });
        }
        const categorydata = await categorymodel.findById(catid);

        const newcat = {
            category_name,
            description,
            categoryimage: req.file ? BASEURL + req.file.path.replace(/\\/g, '/') : categorydata?.categoryaimge
        }

        const updatecategory = await categorymodel.findByIdAndUpdate(catid, newcat, { new: true });
        if (!updatecategory) {
            return res.status(status_codes.BAD_REQUEST).json({
                success: false,
                status: status_codes.BAD_REQUEST,
                message: status_message.CATEGORY_NOT_UPDATE
            });
        }
        return res.status(status_codes.OK).json({
            updatecategory,
            success: true,
            status: status_codes.OK,
            message: status_message.CATEGORY_UPDATE_SUCESSFULLY
        });
    } catch (error) {
        console.error("updatecategory error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}

exports.isactivedeactive = async (req, res) => {
    try {
        const { category_Id, isactive } = req.query;
        const updatedata = await categorymodel.findByIdAndUpdate(category_Id, { isActive: isactive }, { new: true });
        return res.status(status_codes.OK).json({
            updatedata,
            success: true,
            status: status_codes.OK,
            message: status_message.CATEGORY_STATUS_UPDATE
        });

    } catch (error) {
        console.error("isactivedeactive error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
}


exports.deletecategory = async (req, res) => {
    try {
        const { category_Id } = req.query;
        const checkdata = await categorymodel.findById(category_Id);

        if (checkdata?.categoryimage) {
            // Extract only the file path after "uploads/"
            let relativePath = checkdata.categoryimage.split('/uploads/')[1];

            if (relativePath) {
                const oldPath = path.join(__dirname, '..', 'uploads', relativePath);
                console.log("Deleting file:", oldPath);

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                    console.log("File deleted successfully");
                } else {
                    console.log("File not found on disk:", oldPath);
                }
            }
        }

        const deletedata = await categorymodel.findByIdAndDelete(category_Id);

        return res.status(status_codes.OK).json({
            deletedata,
            success: true,
            status: status_codes.OK,
            message: status_message.CATEGORY_DELETE_SUCCESS
        });
    } catch (error) {
        console.error("deletecategory error:", error);
        res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: status_codes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }
};


// exports.deletecategory = async (req, res) => {
//     try {
//         const { category_Id } = req.query;
//         const checkdata = await categorymodel.findById(category_Id);

//         if (checkdata?.categoryimage) {

//             let reletivepath = checkdata?.categoryimage.split('/uploads/')[1];
//             console.log("reletivepath", reletivepath);

//             if (reletivepath) {
//                 const oldapath = path.join(__dirname, '..', checkdata.categoryimage);
//                 console.log("oldpath", checkdata.categoryimage);
//                 if (fs.existsSync(oldapath)) {
//                     fs.unlinkSync(oldapath);
//                 } else {
//                     console.log("file not found");
//                 }
//             }

//         }
//         // const deletedata = await categorymodel.findByIdAndDelete(category_Id);
//         // return res.status(status_codes.OK).json({
//         //     deletedata,
//         //     success: true,
//         //     status: status_codes.OK,
//         //     message: status_message.CATEGORY_DELETE_SUCCESS
//         // });
//     } catch (error) {
//         console.error("deletecategory error:", error);
//         res.status(status_codes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             status: status_codes.INTERNAL_SERVER_ERROR,
//             message: "Internal server error",
//         });
//     }
// }