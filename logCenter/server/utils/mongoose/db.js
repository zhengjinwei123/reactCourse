let Mongoose = require('mongoose');
Mongoose.Promise = global.Promise = require('bluebird');
let Schema = Mongoose.Schema;
let poolModule = require('generic-pool');
let Util = require("util");
let Emitter = require("events").EventEmitter;
let FileUtil = require("../fileUtil");
let Path = require("path");

let MongodbUtil = function () {
    Emitter.call(this);
};

Util.inherits(MongodbUtil, Emitter);

MongodbUtil.prototype.set = function (host, port, db, userOption, runPath,modelList) {
    this.host = host || '127.0.0.1';
    this.port = port || 27017;
    this.db = db;
    this.dbUrl = null;

    if (!userOption) {
        this.dbUrl = Util.format("mongodb://%s:%d/%s", this.host, this.port, db);
    } else {
        if (userOption['user'] && userOption['password']) {
            this.dbUrl = Util.format("mongodb://%s:%s@%s:%d/%s", userOption.user, userOption.password, this.host, this.port, db);
        }
    }

    if (this.dbUrl === null) {
        throw new Error("args error");
    }

    this.runPath = runPath || Path.join(__dirname, "/schemas");

    let _error = null;
    try {
        if (!FileUtil.isExists(this.runPath)) {
            FileUtil.createDirectory(this.runPath);
        }
    } catch (e) {
        _error = e.message;
    } finally {
        if (_error) {
            console.error(_error);
            process.exit(1);
        }
    }

    this.runList = {};

    let self = this;

    const factory = {
        create: function () {
            return new Promise(function (resolve, reject) {
                let client = Mongoose.createConnection(self.dbUrl, {
                    useMongoClient: true
                });
                client.on('connected', function () {
                    resolve(client)
                })
            })
        },
        destroy: function (client) {
            return new Promise(function (resolve) {
                client.on('end', function () {
                    resolve()
                });
                client.disconnect()
            })
        }
    };

    let opts = {
        max: 10, // maximum size of the pool
        min: 2 // minimum size of the pool
    };

    this.myPool = poolModule.createPool(factory, opts);

    if(!modelList){
        this.loadSchema();
    }else{
        modelList.forEach((m)=>{
            if (m['table'] && m['schema']) {
                this.runList[m.table] = this.runList[m.table] || m.schema;
            }
        })
    }
};


MongodbUtil.getInstance = (function () {
    let inst = null;
    return function () {
        if (inst instanceof MongodbUtil) {
            return inst;
        }
        inst = new MongodbUtil();
        return inst;
    }
})();

MongodbUtil.prototype.loadSchema = function () {
    let schemaFileList = FileUtil.traverseSync(this.runPath);

    schemaFileList.forEach((f) =>{
        let scheme = require(f.path);
        if (scheme['table'] && scheme['schema']) {
            this.runList[scheme.table] = this.runList[scheme.table] || scheme.schema;
        }
    });
};


MongodbUtil.prototype.exec = function (callback) {
    const resourcePromise = this.myPool.acquire();
    resourcePromise.then(function (client) {
        callback(null, {
            model: client.model(this.modelName, this.runList[this.modelName]),
            release: function(){
                this.myPool.release(client);
            }.bind(this)
        })
    }.bind(this)).catch(function (err) {
        callback(err);
    }.bind(this));

};

MongodbUtil.prototype.schema = function (modelName) {
    if (this.runList[modelName]) {
        this.modelName = modelName;
        return this;
    } else {
        throw new Error(modelName + " is not undefine");
    }
};

module.exports = MongodbUtil.getInstance();

