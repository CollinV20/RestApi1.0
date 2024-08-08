import express, { Router } from 'express'
import path from 'path';
import bodyParser from 'body-parser'

interface Options {
    port: number,
    routes: Router
    publicPath?: string,
}
export class Server {

    private app = express();

    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, publicPath = 'public', routes } = options;

        this.port = port
        this.publicPath = publicPath
        this.routes = routes
    }

    async start() {

        //* Public folder
        this.app.use(express.static(this.publicPath));

        //* Middleware
        this.app.use(express.json()); // raw
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencode

        //*Routes 
        this.app.use(this.routes)


        //* SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`App listen on port 3000`)
        })

    }
}