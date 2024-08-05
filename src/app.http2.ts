import http2 from 'http2';
import fs from 'fs'

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
}, (req, res) => {

    const url = req.url 

    const person = {
        name: "John Doe",
        age: 30,
        Country: 'Honduras'
    }

    console.log(req.url)

    if (url === '/') {
        const httpFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(httpFile)
        return;
    }

    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { "Content-type": "application/javascript" });
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { "Content-type": "text/css" });
    }


    try {
        const responseContent = fs.readFileSync(`./public/${req.url}', 'utf-8`);
        res.end(responseContent);
    } catch (error) {
        res.writeHead(404, { "Content-Type": "text/html" })
        res.end()
    }

})

server.listen(8080, () => {
    console.log("Port run")
});
