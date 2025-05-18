import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { PassportStatic } from 'passport';
import { Track } from '../model/Track'; 

export const configureTrackRoutes = (passport: PassportStatic, router: Router): Router => {

  async function getTrack(req: Request, res: Response, next: NextFunction) {
    try {
      const track = await Track.findById(req.params.id);
      if (track == null) {
        return res.status(404).json({ message: 'A zene nem található' });
      }
      res.locals.track = track; 
      next();
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // POST /tracks - új zene felvétele
  router.post('/', async (req: Request, res: Response) => {
    const track = new Track({
      title: req.body.title,
      artist: req.body.artist,
      image_url: req.body.image_url,
      video_url: req.body.video_url,
    });

    try {
      const newTrack = await track.save();
      res.status(201).json(newTrack);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  // GET /tracks - összes zene lekérdezése
  router.get('/', async (req: Request, res: Response) => {
    try {
      const tracks = await Track.find();
      res.status(200).json(tracks);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // GET /tracks/:id - egy zene lekérdezése id alapján
  router.get('/:id', getTrack, (req: Request, res: Response) => {
    res.json(res.locals.track);
  });

  // POST /tracks/:id - egy zene frissítése id alapján
  router.post('/:id', getTrack, async (req: Request, res: Response) => {
    const track = res.locals.track;

    if (req.body.title != null) {
      track.title = req.body.title;
    }
    if (req.body.artist != null) {
      track.artist = req.body.artist;
    }
    if (req.body.image_url != null) {
      track.image_url = req.body.image_url;
    }
    if (req.body.video_url != null) {
      track.video_url = req.body.video_url;
    }

    try {
      const updatedTrack = await track.save();
      res.json(updatedTrack);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  // DELETE /tracks/:id - egy zene törlése id alapján
  router.delete('/:id', getTrack, async (req: Request, res: Response) => {
    try {
      await res.locals.track.remove();
      res.json({ message: 'A zene sikeresen törölve!' });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  return router;
};
