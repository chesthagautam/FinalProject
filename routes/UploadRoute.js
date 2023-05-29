import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const route = express.Router();

cloudinary.config({
	cloud_name: "dvqyf0z5n",
	api_key: "381351263459418",
	api_secret: "VftXMYckmNYtiwFiQM8-CPOMFvE",
});

const storagePDF = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "PDFSection",
		resource_type: "image",
		allowedFormats: ["pdf"],
	},
});

const storageImage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "ImageSection",
		resource_type: "image",
		allowedFormats: ["jpg", "jpeg", "png"],
	},
});
const uploadPDF = multer({ storage: storagePDF }).single("file");
const uploadImg = multer({ storage: storageImage }).single("image");

route.post("/upload_pdf", uploadPDF, async (req, res) => {
	try {
		const result = await cloudinary.uploader.upload(req.file.path);
		res.status(201).json({ url: result.secure_url });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Something went wrong" });
	}
});

route.post("/upload_img", uploadImg, async (req, res) => {
	try {
		const result = await cloudinary.uploader.upload(req.file.path);
		res.status(201).json({ url: result.secure_url });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Something went wrong" });
	}
});
export default route;
