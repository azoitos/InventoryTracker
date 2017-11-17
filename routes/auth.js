'use strict'

const router = require('express').Router();
const User = require('../db/models/User');

//users login
router.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) res.status(401).send('User Not Found');
            else if (!user.correctPassword(req.body.password)) res.status(401).send('Incorrect Password');
            else {
                req.login(user, err => {
                    if (err) next(err);
                    else res.json(user);
                })
            }
        })
        .catch(next);
})

//signup users
router.post('/signup', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            req.login(user, err => {
                if (err) next(err);
                else res.json(user)
            })
        })
        .catch(next)
})

//logout users -- passport makes this easy
router.post('/logout', (req, res, next) => {
    req.logout();
    res.sendStatus(200);
});

//Fetch the logged in user on our session
router.get('/whoami', (req, res, next) => {
    // console.log(req.user);
    res.json(req.user);
});

module.exports = router;
