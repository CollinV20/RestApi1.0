"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http2_1 = __importDefault(require("http2"));
const fs_1 = __importDefault(require("fs"));
const server = http2_1.default.createSecureServer({
    key: fs_1.default.readFileSync('./keys/server.key'),
    cert: fs_1.default.readFileSync('./keys/server.crt')
}, (req, res) => {
    var _a, _b;
    const url = req.url;
    const person = {
        name: "John Doe",
        age: 30,
        Country: 'Honduras'
    };
    console.log(req.url);
    if (url === '/') {
        const httpFile = fs_1.default.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(httpFile);
        return;
    }
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.endsWith('.js')) {
        res.writeHead(200, { "Content-type": "application/javascript" });
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.endsWith('.css')) {
        res.writeHead(200, { "Content-type": "text/css" });
    }
    try {
        const responseContent = fs_1.default.readFileSync(`./public/${req.url}', 'utf-8`);
        res.end(responseContent);
    }
    catch (error) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end();
    }
});
server.listen(8080, () => {
    console.log("Port run");
});
