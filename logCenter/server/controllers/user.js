let MongooseUtil = require("../utils/mongoose/db");
let Trunkify = require("thunkify-wrap");
let Encrypt = require("../utils/encrypt");


function* login() {
    let param = this.request.body;
    if (param === undefined ||
        param.email === undefined ||
        param.password === undefined) {
        this.send("param error");
        return;
    }

    MongooseUtil.schema('user');
    let exec = yield Trunkify(MongooseUtil.exec, MongooseUtil)();
    if (exec) {
        let result = yield Trunkify(exec.model.getData, exec.model)(param.email);
        if (!result) {
            this.send("用户不存在");
        } else {
            if (result.password === Encrypt.md5(param.password)) {
                this.session.user = param.email;
                this.send(null, "login success");
            } else {
                this.send("密码错误");
            }
        }
        // 释放数据库连接
        exec.release();
    } else {
        this.send("db error");
    }
}
export default {login}
