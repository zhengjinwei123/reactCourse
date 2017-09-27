let Rangedate = require('rangedate');
let timeUtils = function () {
    this.init();
};

timeUtils.getInstance = (function () {
    let _inst = null;
    return function () {
        if (_inst instanceof timeUtils) {
            return _inst;
        }
        _inst = new timeUtils();
        return _inst;
    }
})();

timeUtils.prototype.init = function () {

    /**
     * 获取标准的本地日期字符串
     *
     * 由于不同的操作系统调用这个接口产生的字符串是不一样的
     * @returns {string}
     */
    Date.prototype.init = function () {
        this.year = this.getFullYear();
        this.month = this.getMonth() + 1;
        this.day = this.getDate();

        this.hour = this.getHours();
        this.minute = this.getMinutes();
        this.second = this.getSeconds();
        this.milliSecond = this.getMilliseconds();
    };

    Date.prototype.toLocaleDateString = function (sp) {
        if (sp === undefined) {
            sp = "-";
        }
        let month = this.getMonth() + 1;
        let day = this.getDate();
        month = month > 9 ? month.toString() : ("0" + month);
        day = day > 9 ? day.toString() : ("0" + day);
        return this.getFullYear() + sp + month + sp + day;
    };

    /**
     *
     * @returns {string}
     */
    Date.prototype.toLocaleString = function () {
        let month = this.getMonth() + 1;
        let day = this.getDate();
        month = month > 9 ? month.toString() : ("0" + month);
        day = day > 9 ? day.toString() : ("0" + day);
        let hourse = this.getHours();
        hourse = hourse > 9 ? hourse.toString() : ("0" + hourse);
        let minutes = this.getMinutes();
        minutes = minutes > 9 ? minutes.toString() : ("0" + minutes.toString());
        let second = this.getSeconds();
        second = second > 9 ? second.toString() : ("0" + second.toString());
        return this.getFullYear() + "-" + month + "-" + day + " " + hourse + ":" + minutes + ":" + second;
    };

    /**
     * 格式化时间 "0000-00-00 00:00:00"
     * 丢弃掉时间的小时部分
     *
     * @method  normalize
     */
    Date.prototype.normalize = function () {
        return this.toLocaleDateString() + " 00:00:00";
    };

    /**
     * 判定是否是今天
     *  大于今天的0点视为是今天
     *
     * @method isToday
     * @returns {boolean}
     */
    Date.prototype.isToday = function () {
        return this >= new Date(new Date().normalize());
    };

    /**
     * 判定是否是当前时间
     *  是今天 并且 大于等于当前时间的小时数 视为是当前小时
     * @method thisHours
     * @returns {boolean}
     */
    Date.prototype.thisHours = function () {
        return this.isToday() && (this.getHours >= new Date().getHours());
    };

    /**
     * 根据当前对象的时间获得一个新的日期
     * 这个日期为距离day天的 00:00:00
     *
     * @method otherDay
     * @param day
     * @returns {Date}
     */
    Date.prototype.otherDay = function (day) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + day,
            this.getHours(),
            this.getMinutes(),
            this.getSeconds(),
            this.getMilliseconds()
        );
    };

    /**
     * 根据当前日志计算差距N小时的时间戳
     *
     * @method otherHour
     * @param duration
     * @returns {Date}
     */
    Date.prototype.otherHour = function (duration) {
        return new Date(this.getTime() + (duration * 3600000));
    };

    /**
     * 根据对象的日期产生到目标点的天数集合
     *
     * @method durationDay
     * @param day
     * @returns {Array}
     */
    Date.prototype.durationDay = function (day) {
        let s = new Date(this.normalize());
        return Rangedate(s, day).map(function (data) {
            return new Date(data.normalize());
        });
    };

    /**
     * 计算日期之间的小时数
     *
     * @method durationHours
     * @param day
     * @returns {Array}
     */
    Date.prototype.durationHours = function (day) {
        let res = [];
        let max, min;
        max = this > day ? this : day;
        min = this > day ? day : this;

        let durations = max - min;
        let hours = Math.ceil(durations / 3600000);
        for (let i = 0; i < hours; i++) {
            let d = new Date(min.getTime() + (i * 3600000));
            if (d < max) {
                res.push(d);
            }
        }
        return res;
    };

    /**
     *
     * @returns {Date}
     */
    Date.prototype.toLocalDate = function () {
        let date = this;
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    };


    /**
     *
     * @returns {boolean}
     */
    Date.prototype.isSameDay = function () {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        if (this.getTime() === date.getTime()) {
            return true;
        }
        return false;
    };

    function fix2num(n) {
        return [0, n].join('').slice(-2);
    }

    Date.prototype.timeFormat = function (format, time) {
        let curdate = (time > 0) ? new Date(time) : this;
        if (format === undefined) return curdate;
        format = format.replace(/Y/i, curdate.getFullYear());
        format = format.replace(/m/i, fix2num(curdate.getMonth() + 1));
        format = format.replace(/d/i, fix2num(curdate.getDate()));
        format = format.replace(/H/i, fix2num(curdate.getHours()));
        format = format.replace(/i/i, fix2num(curdate.getMinutes()));
        format = format.replace(/s/i, fix2num(curdate.getSeconds()));
        format = format.replace(/ms/i, curdate.getMilliseconds());
        return format;
    };

    // 静态方法 正则判断指定字符串是否是合法日期
    Date.isDateString = function (str) {
        let dateMode = /^\d{4,}\/|-(?:0?\d|1[12])\/|-(?:[012]?\d|3[01]) (?:[01]?\d|2[0-4]):(?:[0-5]?\d|59):(?:[0-5]?\d|59)$/;
        return dateMode.test(str);
    };

    // 获取指定日期的最后一天
    Date.prototype.getLastDay = function (year, month) {
        year = year || this.getFullYear();
        month = month || this.getMonth() + 1;
        // 下个月的第 0 天是当前月的最后一天
        let day = new Date(year, month+1, 0);
        let lastdate = year + '-' + (month) + '-' + day.getDate();//获取当月最后一天日期
        return new Date(lastdate);
    };

    Date.prototype.getFirstDay = function(){
        let d = new Date(this.getFullYear(),this.getMonth()+1,1);
        return d;
    };

    Date.prototype.toLastMonth = function(){
        let d = new Date(this.getFullYear(),this.getMonth(),this.getDate());
        return d;
    };

    // 静态方法获取一个月最后一天
    Date.getLastDay = function (year, month) {
        // 当前月的第0天就是上个月的最后一天
        let day = new Date(year, month, 0);
        let lastdate = year + '-' + month + '-' + day.getDate();//获取当月最后一天日期
        return new Date(lastdate);
    };

    Date.prototype.getYearMonthString = function(){
        return this.getFullYear()+"-"+(this.getMonth()+1);
    };

    Date.int2date = function(intTime){
        let str = intTime.toString();
        let year = str.slice(0,4);
        let month = str.slice(4,6);
        let day = str.slice(6,8);

        return new Date(year+"-"+month+"-"+day+" 00:00:00");
    };

    // 获取两个日期之间的月份，以年月的格式返回
    Date.prototype.getMonthList = function (otherDate) {
        if (this.getFullYear() === otherDate.getFullYear()) {
            let year = this.getFullYear();

            let curMonth = this.getMonth() + 1;
            let otherMonth = otherDate.getMonth() + 1;
            let ret = [];
            if (curMonth === otherMonth) {
                ret.push({
                    y:year,
                    m:curMonth
                });
            } else if (curMonth < otherMonth) {
                for (let i = curMonth; i <= otherMonth; i++) {
                    ret.push({
                        y:year,
                        m:curMonth
                    });
                }
            } else {
                for (let i = otherMonth; i <= curMonth; i++) {
                    ret.push({
                        y:year,
                        m:curMonth
                    });
                }
            }
            return ret;
        } else {
            let leftDate = this;
            let rightDate = otherDate;
            if(this.getFullYear() > otherDate.getFullYear()){
                leftDate = otherDate;
                rightDate = this;
            }

            let leftMonth = leftDate.getMonth()+1;
            let rightMonth = rightDate.getMonth()+1;

            let ret = [];
            for(let i=leftMonth;i<=12;i++){
                ret.push({
                    y:leftDate.getFullYear(),
                    m:i
                })
            }

            for(let i=1;i<=rightMonth;i++){
                ret.push({
                    y:rightDate.getFullYear(),
                    m:i
                })
            }

            return ret;
        }
    }
};

module.exports = timeUtils.getInstance();



