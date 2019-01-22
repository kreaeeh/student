'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
          name: 'admin',
          email: 'admin@student.io',
          password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa', //default password is 1122
          createdAt: new Date().toISOString().slice(0, 10),
          updatedAt: new Date().toISOString().slice(0, 10)

      },
          {
              name: 'rahman',
              email: 'rahman@student.io',
              password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa' ,//default password is 1122,
              createdAt: new Date().toISOString().slice(0, 10),
              updatedAt: new Date().toISOString().slice(0, 10)


          },
          {
              name: 'abdullah',
              email: 'abdullah@student.io',
              password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa' ,//default password is 1122,
              createdAt: new Date().toISOString().slice(0, 10),
              updatedAt: new Date().toISOString().slice(0, 10)

          },
          {
              name: 'omar',
              email: 'omar@student.io',
              password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa' ,//default password is 1122,
              createdAt: new Date().toISOString().slice(0, 10),
              updatedAt: new Date().toISOString().slice(0, 10)


          },
          {
              name: 'ali',
              email: 'ali@student.io',
              password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa' ,//default password is 1122,
              createdAt: new Date().toISOString().slice(0, 10),
              updatedAt: new Date().toISOString().slice(0, 10)

          },
          {
              name: 'ahmad',
              email: 'ahmad@student.io',
              password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa', //default password is 1122,
              createdAt: new Date().toISOString().slice(0, 10),
              updatedAt: new Date().toISOString().slice(0, 10)

          }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
