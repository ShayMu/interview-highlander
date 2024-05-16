import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
const port:number = 3001;

function initServer() {
    app.use(cors());
    app.use(express.json());
    app.use(routes);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}


initServer();