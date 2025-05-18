import { Router, Request, Response, NextFunction } from 'express';
import { PassportStatic } from 'passport';
import { Playlist } from '../model/Playlist';


export const configurePlaylistRoutes = (passport: PassportStatic, router: Router): Router => {

  async function getPlaylist(req: Request, res: Response, next: NextFunction) {
    try {
      const playlist = await Playlist.findById(req.params.id);
      if (!playlist) {
        return res.status(404).json({ message: 'A lejátszási lista nem található' });
      }
      res.locals.playlist = playlist;
      next();
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  // POST /playlists - új playlist létrehozása
  router.post('/', async (req: Request, res: Response) => {
    const playlist = new Playlist({
      name: req.body.name,
      trackIds: req.body.trackIds,
      createdBy: req.body.createdBy,
      isPublic: req.body.isPublic,
    });

    try {
      const newPlaylist = await playlist.save();
      res.status(201).json(newPlaylist);
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  });

  // GET /playlists - összes playlist lekérdezése
  router.get('/', async (req: Request, res: Response) => {
    try {
      const playlists = await Playlist.find();
      res.json(playlists);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  });

  // GET /playlists/:id - egy playlist lekérdezése id alapján
  router.get('/:id', getPlaylist, (req: Request, res: Response) => {
    res.json(res.locals.playlist);
  });

  // POST /playlists/:id - playlist frissítése
  router.post('/:id', getPlaylist, async (req: Request, res: Response) => {
    const playlist = res.locals.playlist;
    const fields = ['name', 'trackIds', 'createdBy', 'isPublic'];

    fields.forEach(field => {
      if (req.body[field] != null) {
        playlist[field] = req.body[field];
      }
    });

    try {
      const updatedPlaylist = await playlist.save();
      res.json(updatedPlaylist);
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  });

  // DELETE /playlists/:id - playlist törlése
  router.delete('/:id', getPlaylist, async (req: Request, res: Response) => {
    try {
      await res.locals.playlist.remove();
      res.json({ message: 'A lejátszási lista törölve lett' });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  });

  return router;
};
