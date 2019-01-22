const User = require('../models/').user;
const authController = require('../controllers/authentication');
const rp = require('request-promise');
const hashConfig = require('../config/hashConfig');


module.exports = {
    getStudentList(req, res) {
        // Check if user exists
        const token = req.headers['x-access-token'];
        const student_id = req.param('id');
        let validateTokenResponse;
        if (token === hashConfig.teacher_app_key) {
            validateTokenResponse = {isAuthenticated: true, errors: []};
        } else {
            validateTokenResponse = authController.validateToken(token);
        }
        if (!validateTokenResponse.isAuthenticated) {
            return res.status(403).send({code: 403, message: validateTokenResponse.message});
        } else {
            if (student_id) {
                return User
                    .find({attributes: ['id', 'name','email','createdAt','updatedAt'], where: {id: student_id}}) // inserting a user into the db by using sequlize model
                    .then(student => {
                        // get one homework
                        res.status(201).send({code: 201, data: student});
                    })
                    .catch(error => {
                        res.status(500).send(error)
                        console.log(error);
                    });//should be handled further by identifying the errors and returning meaning full error code
            } else {
                return User
                    .findAll({attributes: ['id', 'name','email','createdAt','updatedAt']}) // inserting a user into the db by using sequlize model
                    .then(students => {
                        // get all homeworks
                        res.status(201).send({code: 201, data: students});
                    })
                    .catch(error => {
                        res.status(500).send(error)
                        console.log(error);
                    });//should be handled further by identifying the errors and returning meaning full error code
            }

        }
    },
    getHomeworkByStudentId(req, res) {
        // Check if user exists
        const token = req.headers['x-access-token'];
        const student_id = req.param('id');
        const validateTokenResponse = authController.validateToken(token);
        if (!validateTokenResponse.isAuthenticated) {
            return res.status(403).send({code: 403, message: validateTokenResponse.message});
        } else {
            if (student_id) {
                const options = {
                    // Calling teacher App to get list of assignment by student id
                    uri: 'http://127.0.0.1:3000/api/assignment?student_id='+student_id,
                    headers: {
                        'x-access-token': 'student_app_secret_key'
                    },
                    json: true // Automatically parses the JSON string in the response
                };

                // Make request to teacher app to get all homework by student id
                rp(options)
                    .then(function (response) {
                        return res.status(response.code).send(response);
                    })
                    .catch(function (err) {
                        // Crawling failed...
                        if(err.error.code){
                            return res.status(err.error.code).send(err.error);
                        }else{
                            return res.status(500).send({code: 500, message: 'Internal server error!'});
                        }
                    });

            } else {
                return res.status(401).send({code: 401, message: 'Student id is required!'});
            }
        }
    },
    submitAssignment(req, res) {
        const token = req.headers['x-access-token'];
        if (!req.body) {
            return res.status(401).send({code: 401, message: 'Body was null'});
        } else if (!req.body.submitted) {
            return res.status(401).send({code: 401, message: 'submitted is required!'});
        } else if (!req.body.assignment_id) {
            return res.status(401).send({code: 401, message: 'assignment_id is required!'});
        }

         const validateTokenResponse = authController.validateToken(token);
        //validate external token
        if (!validateTokenResponse.isAuthenticated) {
            return res.status(403).send({code: 403, message: validateTokenResponse.message});
        } else {
                const options = {
                    uri: 'http://127.0.0.1:3000/api/assignment',
                    method: 'PUT',
                    headers: {
                        'x-access-token': 'student_app_secret_key'
                    },
                    body: req.body,
                    json: true // Automatically parses the JSON string in the response
                };

                // Make request to teacher app to get all homework by student id
                rp(options)
                    .then(function (response) {
                        return res.status(response.code).send(response);
                    })
                    .catch(function (err) {
                        // Crawling failed...
                        if(err.error.code){
                            return res.status(err.error.code).send(err.error);
                        }else{
                            return res.status(500).send({code: 500, message: 'Internal server error!'});
                        }
                    });
        }
    }
}