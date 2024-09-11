function terminate(server: any, options: any = {coredump: false, timeout: 500}) {
    console.log("------------------------------------");
    console.log("Terminating");
    console.log("------------------------------------");
    const exit = (code: any) => {
        options.coredump ? process.abort() : process.exit(code);
    };

    return (code: any, reason: any) => (err: any, promise: any) => {
        if (err && err instanceof Error) {
            console.log(err.message, err.stack);
        }

        setTimeout(exit, options.timeout).unref();
    };
}

export default terminate;