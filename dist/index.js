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
const authMe_1 = __importDefault(require("./API/auth/authMe"));
const signIn_1 = __importDefault(require("./API/auth/signIn"));
const postProxy_1 = __importDefault(require("./API/proxy/postProxy"));
const keeperOnline_1 = __importDefault(require("./API/keeper/keeperOnline"));
const url = 'http://localhost:8080/';
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const keeper = "614496c24da72af8d8f4c13e";
            const Bearer = yield new signIn_1.default(url, "nne_leps@mail.ru", "123").req();
            const t = yield new authMe_1.default(url, Bearer).getTenantId();
            let st = new Date().getTime();
            for (let i = 0; i < 500; i++) {
                const token = yield new postProxy_1.default(url, t, Bearer, "localhost", 5000).getToken();
                const session = yield new keeperOnline_1.default(url, t, Bearer, keeper, String(i), token).getSession();
            }
            let end = new Date().getTime();
            console.log("Done: " + (end - st) + "ms");
        }
        catch (e) {
            console.log(e);
        }
    });
}
test();
//# sourceMappingURL=index.js.map