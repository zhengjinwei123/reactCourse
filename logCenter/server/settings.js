module.exports = {
    mongodb: {
        host: '127.0.0.1',
        port: 27017,
        user: "root",
        password: "root",
        db: "game_logdb_1"
    },
    log: {
        logLevel: {DEBUG: true, INFO: true, WARN: true, ERROR: true},    // 文本LOG记录开关
        consoleLevel: {DEBUG: true, INFO: true, WARN: true, ERROR: true}    // CMD窗口LOG显示开光
    },
    listen: {
        port: 7001,
        host: '127.0.0.1',
        childProcessNum: 2
    }
};
