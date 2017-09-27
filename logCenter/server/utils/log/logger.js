let _ = require('underscore');
let Log = require('./log');
let Setting = require('../../settings');
let Fs = require('fs');

let logsMap = {};
function logger(_options) {
    let options = {
        path: global.rootPath + '/logs/',
        file: 'access',
        fileFormat: 'Ymd'
    };
    options = _.extend(options, Setting.log);
    options = _.extend(options, _options);

    let uk = options.file;
    if (logsMap[uk] == undefined) {
        if (Fs.existsSync(options.path) == false) {
            Fs.mkdirSync(options.path);
        }
        logsMap[uk] = new Log(options);
    }
    return logsMap[uk];
}

module.exports = logger;