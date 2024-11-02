"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorOr = handleErrorOr;
function handleErrorOr(result, onSuccess, onError) {
    if (result.isError()) {
        onError(result);
    }
    else {
        onSuccess(result.getData());
    }
}
