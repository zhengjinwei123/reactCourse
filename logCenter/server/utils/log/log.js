"use strict";

let Util = require('util');
let Fs = require('fs');
let _ = require('underscore');
let DateUtil = require('../dateUtil');

function parseReq(req, arg1, arg2) {
    if(req && arg1 === 'remoteAddress') {
        if(req.client.remoteAddress) return req.client.remoteAddress;
        if (req.ip) return req.ip;
        if (req._remoteAddress) return req._remoteAddress;
        if (req.connection) return req.connection.remoteAddress;
        return undefined;
    } else if(req && arg1 === 'post') {
        if(req.body) return JSON.stringify(req.body);
        return undefined;
    } else if(req && arg1 === 'sid') {
        if(req.sessionID) return req.sessionID;
        return undefined;
    } else if(req && arg1 === 'method') {
        if(req.method) return req.method;
        return undefined;
    } else if(req && arg1 === 'url') {
        return req.originalUrl || req.url;
    }
    return undefined;
}

function Log(_options){
    let defaults = {
        logLevel: {DEBUG: true, INFO: true, WARN: true, ERROR: true},
        consoleLevel: {DEBUG: true, INFO: true, WARN: true, ERROR: true},
        buffer: true,
        interval: 1000,
        path: '',
        file: 'access',
        fileFormat: 'Ymd',
        //fmt: ':remoteAddress [sid/:sid] ":method :url"',
        fmt: ':remoteAddress ":method :url" :post',
    };
    this.options = _.extend(defaults, _options);
    this.options.filename = this.getFilename();
    this.buf = [];
    if (this.options.buffer) {
        // flush interval
        let realWrite = this.write;
        let self = this;
        setInterval(function(){
            if (self.buf.length) {
                realWrite.call(self, self.buf.join(''));
                self.buf.length = 0;
            }
        }, this.options.interval);

        // swap the stream
        this.write = function(str){
            self.buf.push(str);
        }
    }
}
Log.prototype.initFmt = function(str) {
    this.options.fmt = str;
};
Log.prototype.getFilename = function() {
    let format = this.time(this.options.fileFormat);
    return [this.options.path, this.options.file, format, '.log'].join('');
};
Log.prototype.time = function(format){
    return new Date().timeFormat(format)
};
Log.prototype.write = function(str){
    Fs.appendFile(this.options.filename, str, {flat:'a'});
};
Log.prototype.level = {
    ERROR:'error',
    WARN:'warn',
    INFO:'info',
    DEBUG:'debug',
};
Log.prototype.colorTag = {
    "error_prefix": "\u001B[31m",
    "error_suffix": "\u001B[39m",
    "warn_prefix": "\u001B[32m",
    "warn_suffix": "\u001B[39m",
    "info_prefix": "\u001B[1m",
    "info_suffix": "\u001B[22m",
    "debug_prefix": "\u001B[35m",
    "debug_suffix": "\u001B[39m"
};

Log.prototype.log = function(req, msg){
    let reqinfo = '';
    msg = msg || '';
    if(req) {
        let fmt = this.options.fmt;
        reqinfo = fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function(_, arg1, arg2){
            return parseReq(req, arg1, arg2) || '-';
        });
    }
    let line = Util.format('%s [%s] %s %s\r\n',
        this.time('Y-m-d H:i:s ms'),
        process.pid,
        reqinfo,
        msg);
    this.options.filename = this.getFilename();
    this.write(line);
};

Log.prototype.console = function(req, level, msg){
    let _level = this.level[level];
    console.log([
        this.colorTag[_level + "_prefix"],
        this.time('Y-m-d H:i:s ms'),
        '[' + process.pid + ']',
        '[' + _level + ']',
        this.colorTag[_level + "_suffix"],
        msg
    ].join(' '));
};

Log.prototype._log = function(level, req, msg){
    if( this.options.logLevel[level] ) {
        this.log(req, msg);
    }
    if( this.options.consoleLevel[level] ) {
        this.console(req, level, msg);
    }
    return;
};
Log.prototype.error = function(req, msg){
    this._log('ERROR', req, msg);
};

Log.prototype.warn = function(req, msg){
    this._log('WARN', req, msg);
};

Log.prototype.info = function(req, msg){
    this._log('INFO', req, msg);
};

Log.prototype.debug = function(req, msg){
    this._log('DEBUG', req, msg);
};

module.exports = Log;