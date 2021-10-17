"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = exports.ResponseStatusCode = exports.MethodResponse = void 0;
var MethodResponse = /** @class */ (function () {
    function MethodResponse(status, responseMessage, payload) {
        this.status = status,
            this.responseMessage = responseMessage;
        this.payload = payload;
    }
    ;
    return MethodResponse;
}());
exports.MethodResponse = MethodResponse;
var ResponseStatusCode;
(function (ResponseStatusCode) {
    ResponseStatusCode[ResponseStatusCode["Okay"] = 200] = "Okay";
    ResponseStatusCode[ResponseStatusCode["BadRequest"] = 400] = "BadRequest";
    ResponseStatusCode[ResponseStatusCode["Unauthorized"] = 401] = "Unauthorized";
    ResponseStatusCode[ResponseStatusCode["Forbidden"] = 403] = "Forbidden";
    ResponseStatusCode[ResponseStatusCode["InternalError"] = 500] = "InternalError";
})(ResponseStatusCode = exports.ResponseStatusCode || (exports.ResponseStatusCode = {}));
var Events;
(function (Events) {
    Events["addNewRefreshToken"] = "addNewRefreshToken";
})(Events = exports.Events || (exports.Events = {}));
//# sourceMappingURL=common.js.map