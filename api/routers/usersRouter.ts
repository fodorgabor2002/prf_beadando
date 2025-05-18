import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import passport, { PassportStatic } from 'passport';
import { User } from '../model/User';

export const configureUserRoutes = (passport: PassportStatic, router: Router): Router => {

  async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'A felhasználó nem található' });
      }
      res.locals.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // POST /users/login - bejelentkezés
  router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Helytelen felhasználónév vagy jelszó');
    }

    passport.authenticate('local', (error: { message: any; }, user: Express.User, info: any) => {
      if (error) return res.status(500).send(error.message || error);
      if (!user) return res.status(401).send('Helytelen felhasználónév vagy jelszó');

      req.login(user, (err) => {
        if (err) return res.status(500).send(err.message || err);
        return res.status(200).send('Bejelentkezes sikeres');
      });
    })(req, res, next);
  });

  // POST /users/logout - kijelentkezés
  router.post('/logout', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) {
          console.error('Hiba a kijelentkezés során', err);
          return res.status(500).send(err.message || err);
        }
        return res.status(200).send('Kijelentkezes sikeres');
      });
    } else {
      return res.status(403).send('Nem is volt bejelentkezve');
    }
  });

  // GET /users/status - bejelentkezési státusz lekérdezése
  router.get('/status', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      return res.status(200).json(req.user);
    } else {
      return res.status(403).send('Nem is volt bejelentkezve');
    }
  });

  // GET /users - összes felhasználó lekérése
  router.get('/', async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // GET /users/:id - egy felhasználó lekérése id alapján
  router.get('/:id', getUser, (req: Request, res: Response) => {
    res.json(res.locals.user);
  });

  // POST - új felhasználó létrehozása
  router.post('/register', async (req: Request, res: Response) => {
    const { username, password, isAdminAcces } = req.body;

    const user = new User({
      username,
      password,
      isAdminAcces
    });
    console.log(user);
    try {
      const newUser = await user.save();
      res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  // POST /users/:id - felhasználó frissítése
  router.post('/:id', getUser, async (req: Request, res: Response) => {
    const user = res.locals.user;

    const { username, password, accessLevel, birthdate } = req.body;
    if (username != null) user.username = username;
    if (password != null) user.password = password;
    if (accessLevel != null) user.accessLevel = accessLevel;
    if (birthdate != null) user.birthdate = birthdate;

    try {
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  // DELETE /users/:id - felhasználó törlése
  router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'A felhasználó nem található' });
    }
    res.json({ message: 'A felhasználó sikeresen törölve!' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});


  return router;
};
