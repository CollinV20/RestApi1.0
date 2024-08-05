import { envs } from "./config/envs";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";


(async () => {
    main();
})();

//hola como estas bebe

function main() {

    const opc = {
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRouter.routes
    }
    const server = new Server(opc);
    server.start();
}