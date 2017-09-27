let Cluster = require("cluster");
let Util = require('util');
let Cpus = require('os').cpus();
let Path = require("path");
global.rootPath = Path.resolve(__dirname, "../");
let Logger = require("./utils/log/logger")({file:'access'});
let Settings = require("./settings");


let workers = {};
let childProcessNum = Settings.listen.childProcessNum;
childProcessNum = childProcessNum ? childProcessNum : Cpus.length;

// 给子进程设置监听事件
let workerEvent = function (worker) {
    // 子进程序列ID
    worker.send({
        msg: "scheduler",
        index: worker.workerIndex
    });
};

if (Cluster.isMaster) {
    // 防止子进程崩溃
    Cluster.on('exit', function (worker) {
        let index = worker.workerIndex;
        delete workers[worker.process.pid];
        Logger.info(null, Util.format('child process exit, pid %d', worker.process.pid));
        // 下一个事件轮询时间点，fork一个子进程
        process.nextTick(function () {
            worker = Cluster.fork();
            worker.workerIndex = index;
            workerEvent(worker);
            workers[worker.process.pid] = worker;

            Logger.info(null, Util.format('child process start, pid %d', worker.process.pid));
        });
    });

    for (let i = 0; i < childProcessNum; i++) {
        let worker = Cluster.fork();
        worker.workerIndex = i;
        workerEvent(worker);
        workers[worker.process.pid] = worker;
        Logger.info(null, Util.format('child process start, pid %d', worker.process.pid));
    }

} else {
    require('./server.prod');

    Logger.info(null, Util.format('Report server listening on port %d, pid %d', Settings.listen.port, process.pid));
}

// 终止进程
process.on('SIGTERM', function () {
    for (let pid in workers) {
        process.kill(pid);
    }
    process.exit(0);
});