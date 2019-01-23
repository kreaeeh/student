const User = require('../models/').user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/hashConfig');


/**
 * Function/Module Name : validateToken
 * Purpose : to validate jwt token send in the header and decode it
 * Input: token
 * Output :  validationObj
 **/
const validateToken = (token) => {
    console.log(token);
    const obj = {isAuthenticated: false, message: ''}
    if (!token) {
        obj.message = 'No token was provided!';
        return obj;
    } else {
        return jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                obj.message = 'Invalid token!'
                return obj;
            } else {
                obj.isAuthenticated = true;
                obj['decoded'] = decoded;
                return obj;
            }
        })
    }
}
module.exports = {

    /**
     * Function/Module Name : createUser
     * Purpose : to create user/ register into the database through api request
     * Input: request, response
     * Output :  response
     **/
    createUser(req, res) {
        const validation = this.validateRegistration(req.body);
        if (!validation.isValid) {
            return res.status(401).send({auth: false, token: null, message: validation.errors});
        } else {
            return User
                .findOne({where: {email: req.body.email}}) // inserting a user into the db by using sequlize model
                .then(user => {
                    if (user) {
                        // user already exists
                        return res.status(401).send({auth: false, token: null, message: 'Email already exists!'});
                    } else {
                        User.create(req.body).then(user => {
                            // create a token
                            const token = jwt.sign({id: user.id, email: user.email, name: user.name}, config.secret, {
                                expiresIn: 86400 // expires in 24 hours
                            });
                            res.status(201).send({auth: true, token: token});
                        })
                            .catch(error => {
                                res.status(500).send(error)
                                console.log(error);
                            });//should be handled further by identifying the errors and returning meaning full error code
                    }
                })
                .catch(error => {
                    res.status(500).send(error)
                    console.log(error);
                });//should be handled further by identifying the errors and returning meaning full error code

        }

    },

    /**
     * Function/Module Name : login
     * Purpose : to authenticate user and return the jwt token
     * Input: request, response
     * Output :  {auth : true/false, token: jwt-token}
     **/
    login(req, res) {
        if (!req.body.email) {
            return res.status(401).send({auth: false, token: null, message: 'No username nor email is provided'});
        }
        return User
            .findOne({where: {email: req.body.email}})
            .then(user => {
                if (!user) {
                    return res.status(401).send({auth: false, token: null, message: 'Wrong username or password'});
                }
                // Validate password
                const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) return res.status(401).send({
                    auth: false,
                    token: null,
                    message: 'Wrong username or password'
                });
                const token = jwt.sign({id: user.id, email: user.email, name: user.name}, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return res.status(201).send({auth: true, token: token});
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error)
            });//should be handled further by identifying the errors and returning meaning full error code

    },

    /**
     * Function/Module Name : validateRegistration
     * Purpose : to validate the registration body and confirm that all required fields are ther
     * Input: request, response
     * Output :  {auth : true/false, token: jwt-token}
     **/
    validateRegistration(body) {
        const validateObj = {isValid: false, errors: []};
        if (body) {
            if (!body.email) {
                validateObj['errors'].push('Email is null')
            } else if (!body.name) {
                validateObj['errors'].push('Name is null')
            } else if (!body.password) {
                validateObj['errors'].push('Password is null')
            } else {
                validateObj['isValid'] = true;
                return validateObj;
            }
        } else {
            validateObj['errors'].push('Body is null')
        }
    },
    validateToken

};