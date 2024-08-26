import express, {Express} from 'express';
import v1Router from "./api/v1";
import {server} from "typescript";
import terminate from "./terminate";
import bodyParser from "body-parser";

const exitHandler = terminate(server, {
    coredump: false,
    timeout: 500
})

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
// process.on('SIGINT', exitHandler(0, 'SIGINT'))

const app : Express  = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }))

const port = 5000;

app.use('/api/v1', v1Router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});