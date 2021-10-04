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
class PostProxy {
    constructor(url, tenantId, Bearer, ip, port) {
        this.options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ',
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: ''
        };
        this.token = null;
        this.refreshToken = null;
        this.url = url + "api/tenant/" + tenantId + "/proxy";
        this.options.headers.Authorization += Bearer;
        const body = {
            data: {
                ip: ip,
                port: port
            }
        };
        this.options.body = JSON.stringify(body);
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
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.token != null) {
                return this.token;
            }
            else {
                const proxy = yield this.req();
                this.token = proxy.token;
                return this.token;
            }
        });
    }
    getRefreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.refreshToken != null) {
                return this.refreshToken;
            }
            else {
                const proxy = yield this.req();
                this.refreshToken = proxy.refreshToken;
                return this.refreshToken;
            }
        });
    }
}
exports.default = PostProxy;
//# sourceMappingURL=postProxy.js.map