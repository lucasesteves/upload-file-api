import { Request, Response } from 'express'
import fs from "fs";
import md5 from "md5";

export default class FileController {

    async upload(req: Request, res: Response) {
        const { name, currentChunkIndex, totalChunks, data } = req.body;
        const firstChunk = parseInt(currentChunkIndex) === 0;
        const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;
        const ext = name.split('.').pop();
        const buffer = new Buffer(data.toString().split(',')[1], 'base64');
        const tmpFilename = 'tmp_' + md5(name + req.ip) + '.' + ext;

        if (firstChunk && fs.existsSync('./uploads/' + tmpFilename)) {
            fs.unlinkSync('./uploads/' + tmpFilename);
        }

        fs.appendFileSync('./uploads/' + tmpFilename, buffer);

        if (lastChunk) {
            const finalFilename = md5(Date.now()).substr(0, 6) + '.' + ext;
            fs.renameSync('./uploads/' + tmpFilename, './uploads/' + finalFilename);
            res.json({ finalFilename });
        } else {
            res.json({ message: "uploading.." });
        }
    };

}