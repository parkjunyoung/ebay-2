import express from 'express';
import passwordHash from '../libs/passwordHash';
import models from '../models';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.serializeUser(function (user, done) {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('deserializeUser');
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, 
    function (req, username, password, done) {
        models.Users.findOne({
            where : {
                username : username,
                password : passwordHash(password) ,
             }
        }).then(function(user) {
            if (!user){
                return done(null, false, { message: '아이디 또는 비밀번호 오류 입니다.' });
            }else{
                return done(null, user.dataValues );
            }
        });
    }
));

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

router.post('/login' , (req, res ,next) => {
    passport.authenticate('local', function(err, user, info){
        if(!user){
            return res.json({ message: info.message });
        }
        req.logIn(user, function(err) {
            return res.json({ message : "success" });
        });
    })(req, res, next);   
});

router.get('/success', function(req, res){
    res.send(req.user);
});

router.get('/status', function(req, res){
    res.json({ isLogin : req.isAuthenticated() });
});


router.get('/logout', function(req, res){
    req.logout();
    res.json({
        message : "success"
    });
});

export default router;