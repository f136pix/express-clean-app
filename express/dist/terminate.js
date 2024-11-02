"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function terminate(server, options = { coredump: false, timeout: 500 }) {
    console.log("------------------------------------");
    console.log("Terminating");
    console.log("------------------------------------");
    const exit = (code) => {
        options.coredump ? process.abort() : process.exit(code);
    };
    return (code, reason) => (err, promise) => {
        if (err && err instanceof Error) {
            console.log(err.message, err.stack);
        }
        setTimeout(exit, options.timeout).unref();
    };
}
exports.default = terminate;
