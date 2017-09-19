let Mongoose = require('mongoose');

let schemeTable = {
    grade: {type: String, default: '', index: true},
    url: {type: String, default: ''}
};

let schema = new Mongoose.Schema(schemeTable, {});

schema.statics.getData = function (grade,callback) {
    let condition = {};
    if(grade){
        condition['grade'] = grade;
    }
    let view = {};

    this.find(condition, view).lean().exec(callback);
};

schema.statics.insertData = function (grade, url, callback) {
    let newData = new this();
    newData.grade = grade;
    newData.url = url;
    newData.save(newData, callback)
};




export default {
    "table": 'subjects',
    'schema': schema
};
