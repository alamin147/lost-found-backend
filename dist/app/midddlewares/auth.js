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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const error_1 = __importDefault(require("../global/error"));
const http_status_codes_1 = require("http-status-codes");
const auth = (...requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized!");
            }
            const verifiedUser = utils_1.utils.verifyToken(token);
            req.user = verifiedUser;
            if (!verifiedUser) {
                throw new error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized!");
            }
            if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
                throw new error_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Forbidden");
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = auth;
