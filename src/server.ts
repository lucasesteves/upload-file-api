import http from "http";
import cors from "cors";
import express from "express";
import bodyParser from 'body-parser';
import { router } from "./routes";

const PORT = 4000

const app = express();
export const server = http.createServer(app);

app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use('/uploads', express.static('uploads'));

server.listen(PORT, () => {
    console.log("Server running at port " + PORT);
})

app.use(express.json());
app.use(router);
