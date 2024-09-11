import bodyParser from "body-parser";
import express, {Express} from 'express';
import {server} from "typescript";

import v1Router from "./api/v1";
import terminate from "./terminate";
import v2Router from "./api/v2";

const exitHandler = terminate(server, {
    coredump: false,
    timeout: 500
});

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
// process.on('SIGINT', exitHandler(0, 'SIGINT'))

const app : Express  = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});