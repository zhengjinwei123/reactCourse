exports.ids=[3],exports.modules={87:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(8),f=o(c),l=n(11),p=o(l);n(110);var s=function(e){function t(e,n){r(this,t);var o=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return o.shouldComponentUpdate=p.default.shouldComponentUpdate.bind(o),o}return a(t,e),i(t,[{key:"render",value:function(){return f.default.createElement("section",{className:"section-main"},f.default.createElement("p",null,"在线课程"),"前端基于React 技术框架设计,后端基于Koa框架，数据库采用Mongodb,数据来源基于Python爬虫")}}]),t}(c.Component);t.default=s,e.exports=t.default},95:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(8),f=o(c),l=n(87),p=o(l);n(117);var s=n(11),d=o(s),b=function(e){function t(e,n){r(this,t);var o=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return o.shouldComponentUpdate=d.default.shouldComponentUpdate.bind(o),o}return a(t,e),i(t,[{key:"render",value:function(){var e=this.props.actions;return f.default.createElement("div",{className:"app"},f.default.createElement(p.default,{actions:e}))}}]),t}(c.Component);t.default=b,e.exports=t.default},110:function(e,t,n){t=e.exports=n(6)(),t.push([e.id,".section-main{font-size:20px}",""])},117:function(e,t,n){t=e.exports=n(6)(),t.push([e.id,".app{padding:5px 15px}",""])}};