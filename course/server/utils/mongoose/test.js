/*****
 * 测试用例
 */
let MongodbUtil = require("./db");
MongodbUtil.set("localhost", 27017, 'mydb');

MongodbUtil.schema('student').exec(function(err,model,release){
     model.getData(function(err,resp){
         console.log(err,resp)
         release();
    });
});

MongodbUtil.schema('student').exec(function(err,model,release){
    model.insertData(function(err,resp){
        console.log(err,resp)
        release();
    });
});
