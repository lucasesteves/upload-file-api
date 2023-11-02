import { Router } from "express";
import FileController from "./controller/fileController";

const router = Router();

const fileController = new FileController();

router.post("/upload", fileController.upload);

export { router };
