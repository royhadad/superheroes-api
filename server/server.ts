import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from "body-parser";
import rateLimit from 'express-rate-limit';
import {apiRoutes} from './apiRoutes';

const isDev = process.env.NODE_ENV !== 'production';

const app = express();
const pathToBuild = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3001;


const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.set('trust proxy', 1);
app.use("/api/", apiLimiter);

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))
app.use(express.static(pathToBuild));
app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.use(bodyParser.json())
app.use(apiRoutes);

if (!isDev) {
    app.disable('x-powered-by');
    app.get('/*', function (req, res) {
        res.sendFile(path.join(pathToBuild, 'index.html'));
    });
}

app.listen(port, () => console.log(`Server is up on port ${port}...`));

export {};