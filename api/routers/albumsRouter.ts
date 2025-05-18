import { Router } from "express";
import { PassportStatic } from "passport";
import { Album } from "../model/Album";

export const configureAlbumRoutes = (passport: PassportStatic, router: Router): Router => {

  async function getAlbum(req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: any; }): any; new(): any; }; }; locals: { album: any; }; }, next: () => void) {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).json({ message: 'Az album nem található' });
      }
      res.locals.album = album;
      next();
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  // Új album létrehozása
  router.post('/', async (req, res) => {
    const album = new Album({
      name: req.body.name,
      releaseDate: req.body.releaseDate,
      artistName: req.body.artistName,
      length: req.body.length,
      genre: req.body.genre,
      imageUrl: req.body.imageUrl
    });

    try {
      const newAlbum = await album.save();
      res.status(201).json(newAlbum);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  });

  // Összes album lekérdezése
  router.get('/', async (req, res) => {
    try {
      const albums = await Album.find();
      res.json(albums);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

    // Album törlése ID alapján
  router.delete('/:id', async (req, res) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).json({ message: 'Az album nem található' });
      }

      await album.deleteOne();
      res.json({ message: 'Album sikeresen törölve' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  // Album frissítése ID alapján
  router.post('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Az album nem található' });
    }

    // Frissítés a req.body alapján
    if (req.body.name !== undefined) album.name = req.body.name;
    if (req.body.releaseDate !== undefined) album.releaseDate = req.body.releaseDate;
    if (req.body.artistName !== undefined) album.artistName = req.body.artistName;
    if (req.body.length !== undefined) album.length = req.body.length;
    if (req.body.genre !== undefined) album.genre = req.body.genre;
    if (req.body.imageUrl !== undefined) album.imageUrl = req.body.imageUrl;

    const updatedAlbum = await album.save();
    res.json(updatedAlbum);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

  
  return router;
}
