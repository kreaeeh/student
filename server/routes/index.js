const authController = require('../controllers').authentication;
const studentController = require('../controllers').student;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the our API!',
    }));

    /**
     * Register a student account
     */
    app.post('/api/auth/register', (req, res) => {
        authController.createUser(req, res);
    })

    /**
     * login end point
     */
    app.post('/api/auth/login', authController.login);

    /**
     *  logout
     */
    //logout not needed because token can be removed from front-end). However, it is needed when server need to maintian multiple sessions
    app.get('/api/auth/logout', (req, res) => res.status(200).send({
        auth: false,
        token: null,
        message: 'Logout successfully!'
    }));


    /**
     * Get List of students which is stored in users table
     */

    app.get('/api/student', (req, res) => {
        studentController.getStudentList(req, res)
    })

    /**
     * get list of homework by student id
     * this end point will call teacher app to get the list of the homwork
     */
    app.get('/api/student/assignment', (req, res) => {
        studentController.getHomeworkByStudentId(req, res);
    })
    /**
     * This end point is to submit a homework
     * This end point will call the teacher app to notify the teacher when the assignment is done
     */
    app.put('/api/student/assignment', (req, res) => {
        studentController.submitAssignment(req, res);
    })
};