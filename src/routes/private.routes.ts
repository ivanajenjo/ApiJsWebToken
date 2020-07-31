import { Router } from "express";
const router = Router();

import passport from "passport";


router.get('/especial', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('Ahora estas en la seccion prohibida')
})

export default router