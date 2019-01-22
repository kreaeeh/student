'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'email','username');
  },
    down:  (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('users', 'username','email');
    }
};