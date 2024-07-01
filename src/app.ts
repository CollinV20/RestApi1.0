import { envs } from "./config/envs";
import { Server } from "./presentation/Server";


(async () => {
    main();
})();



function main() {

    const opc = {
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH
    }
    const server = new Server(opc);
    server.start();
}