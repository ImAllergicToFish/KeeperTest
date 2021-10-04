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
const node_fetch_1 = __importDefault(require("node-fetch"));
class AuthMe {
    constructor(url, Bearer) {
        this.options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer '
            }
        };
        this.tenantId = null;
        this.url = url + "api/auth/me";
        this.options.headers.Authorization += Bearer;
    }
    req() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield node_fetch_1.default(this.url, this.options);
            if (response.status != 200) {
                throw new Error("Error code: " + response.status);
            }
            const data = yield response.json();
            return data;
        });
    }
    getTenantId() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tenantId != null) {
                return String(this.tenantId);
            }
            else {
                const user = yield this.req();
                this.tenantId = user.tenants[0].tenant._id;
                return String(this.tenantId);
            }
        });
    }
}
exports.default = AuthMe;
//# sourceMappingURL=authMe.js.map