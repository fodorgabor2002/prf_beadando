import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import { configurePassport } from './passport/passport';
import mongoose from 'mongoose';
import { configureUserRoutes } from './routers/usersRouter';
import { configureTrackRoutes } from './routers/tracksRouter';
import { configurePlaylistRoutes } from './routers/playlistsRouter';
import { configureAlbumRoutes } from './routers/albumsRouter';
import client from 'prom-client';

const app = express();
const port = 3080;
const dbURL = "mongodb+srv://admin:QKIufoPrObWpWard@cluster.kxduj3p.mongodb.net/Cluster?retryWrites=true&w=majority";

// Prometheus metrikák inicializálása
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// HTTP request metrikák
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);

// Middleware a metrikák gyűjtéséhez
app.use((req: Request, res: Response, next: () => void) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        const route = req.route ? req.route.path : req.path;
        httpRequestDuration.labels(req.method, route, res.statusCode.toString()).observe(duration);
        httpRequestTotal.labels(req.method, route, res.statusCode.toString()).inc();
    });

    next();
});

// mongodb connection
mongoose.connect(dbURL).then((_) => {
    console.log('Successfully connected to MongoDB.');
}).catch(error => {
    console.log(error);
    return;
});

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// cookieParser
app.use(cookieParser());

// session
const sessionOptions: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
};
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

// CORS beállítás
app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(express.json());

configurePassport(passport);

app.use('/api/user', configureUserRoutes(passport, express.Router()));
app.use('/api/album', configureAlbumRoutes(passport, express.Router()));
app.use('/api/track', configureTrackRoutes(passport, express.Router()));
app.use('/api/playlist', configurePlaylistRoutes(passport, express.Router()));

// Prometheus metrics endpoint
app.get('/metrics', async (req: Request, res: Response) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});

console.log('After server is ready.');
