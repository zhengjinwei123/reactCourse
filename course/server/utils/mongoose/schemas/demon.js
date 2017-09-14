
let Mongoose = require('mongoose');

let schemeTable = {
    name: {type: String},
    age: {type: Number}
};

let schema = new Mongoose.Schema(schemeTable, {});

schema.statics.getData = function (callback) {
    let condition = {};
    let view = {_id: 0};

    this.find(condition,view).lean().exec(callback);
};

schema.statics.insertData = function (callback) {
    let newData = new this();
    newData.name = 'zhengjinwei';
    newData.age = 26;
    return newData.save(newData,callback)
};


module.exports = {
    "table": 'student',
    'schema': schema
};
