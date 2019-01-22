'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        hooks: {
            // hashing the password before inserting into the db
            beforeCreate: (User) => {
                const salt = bcrypt.genSaltSync();
                User.password = bcrypt.hashSync(User.password, salt);
            }
        },
        instanceMethods: {
            // comparing the hashed password
            validPassword: function (password) {
                return bcrypt.compareSync(password, this.password);
            },
        }
    });

    sequelize.sync()
        .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
        .catch(error => console.log('This error occured', error));
    User.associate = (model) => {
        // associations can be defined here
    };
    return User;
};