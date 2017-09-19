let MongooseUtil = require("../utils/mongoose/db");
let Trunkify = require("thunkify-wrap");

function* getSubjects() {
    try {
        MongooseUtil.schema('subjects');
        let exec = yield Trunkify(MongooseUtil.exec, MongooseUtil)();
        if (exec) {
            let result = yield Trunkify(exec.model.getData, exec.model)(null);
            if (!result) {
                this.jsonSend(null,[])
            } else {
                this.jsonSend(null,result);
            }
            // 释放数据库连接
            exec.release();
        } else {
            this.jsonSend("db error");
        }
    }catch(ex){
        this.jsonSend(ex.message);
    }
}


export default {getSubjects}
