import express from 'express';
import passwordHash from '../libs/passwordHash';
import models from '../models';

const router = express.Router();

router.post( '/join' , ( req,res ) => {
    models.Users.create({
        username : req.body.username,
        password : passwordHash(req.body.password) ,
        displayname : req.body.displayname
    }).then(function() {
        res.json({ message : "success" });
    });
});

export default router;