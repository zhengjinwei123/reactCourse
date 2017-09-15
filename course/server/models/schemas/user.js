let Mongoose = require('mongoose');
let Encrypt = require('../../utils/encrypt');

let schemeTable = {
    email: {type: String, default: '', unique: true, match: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/},
    password: {
        type: String, default: '', set: function (password) {
            return Encrypt.md5(password);
        }
    },
    name: {type: String, default: ''},
    age: {type: Number, default: 0},
    create_time: {type: Date, default: Date.now},
    last_update: {type: Date, default: Date.now},
};

let schema = new Mongoose.Schema(schemeTable, {});


schema.statics.getData = function (email, callback) {
    let condition = {
        email: email
    };
    let view = {};

    this.findOne(condition, view).lean().exec(callback);
};

schema.statics.insertData = function (email, password, callback) {
    let newData = new this();
    newData.email = email;
    newData.password = password;
    newData.save(newData, callback)
};


export default {
    "table": 'user',
    'schema': schema
};
// module.exports = {
//     "table": 'user',
//     'schema': schema
// };
