import express from 'express';
import routes from './routes';

const app = express();
const port:number = 3000;

function initServer() {

    app.use(express.json());
    app.use(routes);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}


initServer();