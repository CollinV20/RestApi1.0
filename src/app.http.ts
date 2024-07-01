import http from 'http';
import fs from 'fs'

const server = http.createServer((req, res) => {

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



    // else {
    //     res.writeHead(400, { ' Content-Type': 'text/html' });
    //     res.end()
    // }

})

server.listen(8080, () => {
    console.log("Port run")
});