const Sequelize = require('sequelize');
const crypto = require('crypto'); //node built in crypto
const _ = require('lodash');

const db = require('../db.js');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
    },
    salt: {
        type: Sequelize.STRING,
    }
}, {
        hooks: {
            beforeCreate: setSaltAndPassword,
            beforeUpdate: setSaltAndPassword
        }
    });

//instance methods

User.prototype.correctPassword = (candidatePassword) => {
    return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = () => {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

//class methods
User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = (plainText, salt) => {
    const hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

function setSaltAndPassword(user) {
    //we need to salt and hash again when the user enters their password for the first time
    // and do it again whenever they change it
    if (user.changed('password')) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password, user.salt)
    }
}

module.exports = User;
