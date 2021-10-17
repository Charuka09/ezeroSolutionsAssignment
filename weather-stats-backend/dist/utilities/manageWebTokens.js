"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshToken = exports.handleLogout = exports.handleRefresh = exports.isAuthenticated = exports.generateAccessToken = exports.generateRefreshToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var common_1 = require("../types/common");
var authController_1 = require("../controllers/authController");
var generateRefreshToken = function (email) {
    if (!process.env.REFRESH_SECRET) {
        throw new Error('enviroment variable undefined : REFRESH_SECRET');
    }
    var refreshToken = jsonwebtoken_1.default.sign({ email: email }, process.env.REFRESH_SECRET, { expiresIn: '2d' });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
var generateAccessToken = function (email) {
    if (!process.env.ACCESS_SECRET) {
        throw new Error('enviroment variable undefined : ACCESS_SECRET');
    }
    var accessToken = jsonwebtoken_1.default.sign({ email: email }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
var isAuthenticated = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var header, accessToken, refreshToken, isRefreshTokenValid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
                    throw new Error('jwt token secrets undefined');
                }
                header = req.headers["authorization"];
                if (header == undefined) {
                    res.status(common_1.ResponseStatusCode.Unauthorized).send({ responseMessage: 'Missing \'authorization\' property in header' });
                }
                accessToken = String(header).split(' ')[1];
                try {
                    jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_SECRET);
                    next();
                    return [2 /*return*/];
                }
                catch (_error) {
                    console.log('Access Token Invalid');
                }
                refreshToken = req.cookies.token;
                return [4 /*yield*/, exports.validateRefreshToken(refreshToken, process.env.REFRESH_SECRET)];
            case 1:
                isRefreshTokenValid = _a.sent();
                if (isRefreshTokenValid) {
                    res.status(common_1.ResponseStatusCode.Forbidden).send({ responseMessage: 'Invalid access token' });
                }
                else {
                    res.status(common_1.ResponseStatusCode.Unauthorized).send({ responseMessage: 'Invalid refresh token' });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.isAuthenticated = isAuthenticated;
var handleRefresh = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, isRefreshTokenValid, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!process.env.REFRESH_SECRET) {
                    throw new Error('enviroment variable undefined : REFRESH_SECRET');
                }
                refreshToken = req.cookies.token;
                return [4 /*yield*/, exports.validateRefreshToken(refreshToken, process.env.REFRESH_SECRET)];
            case 1:
                isRefreshTokenValid = _a.sent();
                if (isRefreshTokenValid) {
                    accessToken = exports.generateAccessToken(jsonwebtoken_1.default.decode(refreshToken).email);
                    res.status(common_1.ResponseStatusCode.Okay).send({ responseMessage: 'okay', payload: { accessToken: accessToken } });
                }
                else {
                    res.status(common_1.ResponseStatusCode.Unauthorized).send({ responseMessage: 'Invalid refresh token' });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.handleRefresh = handleRefresh;
var handleLogout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                refreshToken = req.cookies.token;
                return [4 /*yield*/, authController_1.AuthController.removeTokenFromUser({ token: refreshToken, email: jsonwebtoken_1.default.decode(refreshToken).email })];
            case 1:
                _a.sent();
                res.status(common_1.ResponseStatusCode.Okay).send({ responseMessage: 'okay' });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(common_1.ResponseStatusCode.InternalError).send({ responseMessage: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handleLogout = handleLogout;
var validateRefreshToken = function (refreshToken, secret) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedToken, isValidTokenForUser, _error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                jsonwebtoken_1.default.verify(refreshToken, secret);
                decodedToken = jsonwebtoken_1.default.decode(refreshToken);
                return [4 /*yield*/, authController_1.AuthController.validTokenForUser({ email: decodedToken.email, token: refreshToken })];
            case 1:
                isValidTokenForUser = _a.sent();
                if (isValidTokenForUser) {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            case 2:
                _error_1 = _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.validateRefreshToken = validateRefreshToken;
//# sourceMappingURL=manageWebTokens.js.map