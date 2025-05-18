import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession  from 'express-session';
import passport from 'passport';
import { configurePassport } from './passport/passport';
import mongoose from 'mongoose';
import { configureUserRoutes } from './routers/usersRouter';
import { configureTrackRoutes } from './routers/tracksRouter';
import { configurePlaylistRoutes } from './routers/playlistsRouter';
import { configureAlbumRoutes } from './routers/albumsRouter';

const app = express();
const port = 3080;
const dbURL="mongodb+srv://admin:QKIufoPrObWpWard@cluster.kxduj3p.mongodb.net/Cluster?retryWrites=true&w=majority";

// mongodb connection
mongoose.connect(dbURL).then((_) => {
    console.log('Successfully connected to MongoDB.');
}).catch(error => {
    console.log(error);
    return;
});

// bodyParser
app.use(bodyParser.urlencoded({extended: true}));

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
  origin: 'http://localhost:4200',
  credentials: true, 
}));

app.use(express.json());

configurePassport(passport);

app.use('/api/user', configureUserRoutes(passport, express.Router()));
app.use('/api/album', configureAlbumRoutes(passport, express.Router()));
app.use('/api/track', configureTrackRoutes(passport, express.Router()));
app.use('/api/playlist', configurePlaylistRoutes(passport, express.Router()));

app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});

console.log('After server is ready.');

