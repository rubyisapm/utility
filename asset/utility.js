(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["utility"] = factory();
	else
		root["utility"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_RESULT__;/**\n * @author rubyisapm\n */\n!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {\n    var base = __webpack_require__(1),\n        objTransfer = __webpack_require__(2),\n        cookie = __webpack_require__(3),\n        localStorage = __webpack_require__(4),\n        sessionStorage = __webpack_require__(5),\n        URIParser = __webpack_require__(6),\n        numberFormat=__webpack_require__(7),\n        dateFilter=__webpack_require__(8);\n\n    return {\n        base: base,\n        objTransfer: objTransfer,\n        cookie: cookie,\n        localStorage: localStorage,\n        sessionStorage: sessionStorage,\n        URIParser:URIParser,\n        numberFormat:numberFormat,\n        dateFilter:dateFilter\n    };\n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//////////////////\n// WEBPACK FOOTER\n// ./index.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./index.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("/**\n * @author rubyisapm\n */\n!(module.exports = {\n    /**\n     * 将字符串的首字母大写\n     * @param {string} str 原字符串\n     * @returns {string} 转换后的字符串\n     */\n    upperCaseFirst: function (str) {\n        str = str + '';\n        return str.replace(/^[a-z]/, function (firstLetter) {\n            return firstLetter.toUpperCase();\n        })\n    },\n    /**\n     * 将字符串的首字母小写\n     * @param {string} str 原字符串\n     * @returns {string} 转换后的字符串\n     */\n    lowerCaseFirst: function (str) {\n        str = str + '';\n        return str.replace(/^[A-Z]/, function (firstLetter) {\n            return firstLetter.toLowerCase();\n        })\n    },\n    /**\n     * 判断一个值是不是数组\n     * @param {*} val 要判断的值\n     * @returns {boolean} 是否为数组\n     */\n    isArray: function (val) {\n        return Array.isArray(val);\n    },\n    /**\n     * 判断一个值是不是对象\n     * @param {*} val 要判断的值\n     * @returns {boolean} 是否为数组\n     */\n    isObject: function (val) {\n        return typeof val === 'object' && !utility.base.isArray(val);\n    },\n    /**\n     * 检测对象是否为空对象\n     * @param {?Object} obj 要检测的对象，null会被检测为空对象\n     * @returns {boolean}\n     */\n    isEmptyObject:function(obj){\n        for(var i in obj){\n            return false;\n        }\n        return true;\n    },\n    /**\n     * 判断浏览器是否支持storage\n     * @param {string} type 'localStorage'/'sessionStorage'\n     * @returns {boolean}\n     */\n    isStorageAvailable: function (type) {\n        try {\n            var x = '__storage_test__',\n                storage = window[type];\n            storage.setItem(x, x);\n            storage.removeItem(x);\n            return true;\n        } catch (e) {\n            return false;\n        }\n    }\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/base.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./src/base.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_RESULT__;/**\n * @author rubyisapm\n */\n!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){\n  var base=__webpack_require__(1);\n\n  /**\n   * 按照给定的规则转换原对象中的key的格式\n   * @param {Function} transfer 转换函数\n   * @param {?Object} obj 原对象\n   * @returns {?Object} obj 转换后的对象\n   */\n  function transferKeyInObj(transfer,obj){\n    if(obj===null){\n      return obj;\n    }\n    var newObj={},\n      keys=Object.keys(obj);\n    if(keys.length===0){\n      return obj;\n    }\n    keys.map(function(key){\n      var val=obj[key],\n        newKey=transfer(key);\n      if(base.isObject(val)){\n        newObj[newKey]=transferKeyInObj(val);\n      }else if(base.isArray(val)){\n        newObj[newKey]=transferKeyInArray(transfer,val);\n      }else{\n        newObj[newKey]=val;\n      }\n    });\n    return newObj;\n  }\n\n  /**\n   * 按照给定的规则转换原数组中的对象中的key的格式\n   * @param {Function} transfer 转换函数\n   * @param {Array} arr 原对象\n   * @returns {?Object} obj 转换后的对象\n   */\n  function transferKeyInArray(transfer,arr){\n    if(arr.length==0){\n      return arr;\n    }\n    var newArray=[];\n    arr.map(function(item,index){\n      if(base.isArray(item)){\n        newArray[index]=transferKeyInArray(transfer,item);\n      }else if(base.isObject(item)){\n        newArray[index]=transferKeyInObj(transfer,item);\n      }else{\n        newArray[index]=item;\n      }\n    });\n    return newArray;\n  }\n\n  /**\n   * 去除对象中某些属性值的前后空格\n   * @param {object} obj 原对象\n   * @param {array} keys 要修改的key，支持以.分隔的串联属性如app.id\n   * @returns {*} 处理后的对象\n   */\n  function trimSome(obj,keys){\n    var objClone=JSON.parse(JSON.stringify(obj));\n    keys.map(function(key){\n      if(/\\./.test(key)){\n        var target=objClone;\n        keys=key.split('.');\n        keys.map(function(key,index,arr){\n          if(index===arr.length-1){\n            target[key]=target[key].replace(/(^\\s*|\\s*$)/g,'')\n          }else{\n            target=target[key];\n          }\n        });\n      }else{\n        objClone[key]=objClone[key].replace(/(^\\s*|\\s*$)/g,'');\n      }\n    });\n    return objClone;\n  }\n\n\n  return {\n    /**\n     * 将原对象中的key的首字母大写\n     * @param {?Object} obj 原对象\n     * @returns {?Object} 转换后的对象\n     */\n    upperKey:function(obj){\n      return transferKeyInObj(base.upperCaseFirst,obj);\n    },\n    /**\n     * 将原对象中的key的首字母小写\n     * @param {?Object} obj 原对象\n     * @returns {?Object} 转换后的对象\n     */\n    lowerKey:function(obj){\n      return transferKeyInObj(base.lowerCaseFirst,obj);\n    },\n    trimSome:trimSome\n  }\n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/objTransfer.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./src/objTransfer.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_RESULT__;/**\r\n * @author liwei\r\n */\r\n\r\n\r\n!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {\r\n\t\"use strict\";\r\n\r\n\t/**\r\n\t * 获取 cookie\r\n\t * @param  {String} sKey 键名\r\n\t * @return {String}      键名\r\n\t */\r\n\tfunction get(sKey) {\r\n\t\treturn decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\\\s*' + encodeURIComponent(sKey).replace(/[\\-\\.\\+\\*]/g, '\\\\$&') + '\\\\s*\\\\=\\\\s*([^;]*).*$)|^.*$'), '$1')) || null;\r\n\t}\r\n\r\n\t/**\r\n\t * 设置 cookie\r\n\t * @param {String} sKey    键名\r\n\t * @param {String} sValue  键值\r\n\t * @param {[type]} vEnd    过期时间\r\n\t * @param {String} sPath   路径\r\n\t * @param {String} sDomain 域名\r\n\t * @param {Boolean} bSecure 安全\r\n\t */\r\n\tfunction set(sKey, sValue, vEnd, sPath, sDomain, bSecure) {\r\n\t\tvar sExpires = '';\r\n\r\n\t\tif ( !sKey || /^(?:expires|max\\-age|path|domain|secure)$/i.test(sKey) ) {\r\n\t\t\treturn false;\r\n\t\t}\r\n\r\n\t\tif (vEnd) {\r\n\t\t\tswitch (vEnd.constructor) {\r\n\t\t\t\tcase Number:\r\n\t\t\t\t\tsExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;\r\n\t\t\t\t\tbreak;\r\n\r\n\t\t\t\tcase String:\r\n\t\t\t\t\tsExpires = '; expires=' + vEnd;\r\n\t\t\t\t\tbreak;\r\n\t\t\t\t\t\r\n\t\t\t\tcase Date:\r\n\t\t\t\t\tsExpires = '; expires=' + vEnd.toUTCString();\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\tdocument.cookie = encodeURIComponent( sKey ) + '=' + encodeURIComponent( sValue ) +\r\n\t\t\tsExpires +\r\n\t\t\t(sDomain ? '; domain=' + sDomain : '') +\r\n\t\t\t(sPath ? '; path=' + sPath : '') +\r\n\t\t\t(bSecure ? '; secure' : '');\r\n\r\n\t\treturn true;\r\n\t}\r\n\r\n\t/**\r\n\t * 移除某个 cookie\r\n\t * @param  {String} sKey    键名\r\n\t * @param  {String} sPath   路径\r\n\t * @param  {String} sDomain 域名\r\n\t * @return {Boolean}        true-删除成功，false-删除失败\r\n\t */\r\n\tfunction remove(sKey, sPath, sDomain) {\r\n\t\tif ( !sKey || !has(sKey) ) {\r\n\t\t\treturn false;\r\n\t\t}\r\n\r\n\t\tdocument.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +\r\n\t\t\t\t\t\t\t(sDomain ? '; domain=' + sDomain : '') +\r\n\t\t\t\t\t\t\t\t(sPath ? '; path=' + sPath : '');\r\n\t\t\r\n\t\treturn true;\r\n\t}\r\n\r\n\t/**\r\n\t * 判断是否拥有某个 key\r\n\t * @param  {String}  sKey 键名\r\n\t * @return {Boolean}\r\n\t */\r\n\tfunction has(sKey) {\r\n\t\tvar patt = new RegExp( '(?:^|;\\\\s*)' + encodeURIComponent( sKey ).replace(/[\\-\\.\\+\\*]/g, '\\\\$&') + '\\\\s*\\\\=' );\r\n\r\n\t\treturn patt.test( document.cookie );\r\n\t}\r\n\r\n\t/**\r\n\t * 获取\r\n\t * @return {Object} 所有的 cookie 键值对\r\n\t */\r\n\tfunction keys() {\r\n\t\tvar map     = {},\r\n\t\t\tallKeys = document.cookie.\r\n\t\t\t\t\t\treplace(/((?:^|\\s*;)[^\\=]+)(?=;|$)|^\\s*|\\s*(?:\\=[^;]*)?(?:\\1|$)/g, '').\r\n\t\t\t\t\t\t\tsplit( /\\s*(?:\\=[^;]*)?;\\s*/ );\r\n\r\n\r\n\t\tallKeys.forEach(function( key ) {\r\n\t\t\tmap[ decodeURIComponent(key) ] = get( key );\r\n\t\t});\r\n\r\n\t\treturn map;\r\n\t}\r\n\r\n\treturn {\r\n\t\tget    : get,\r\n\t\tset    : set,\r\n\t\tremove : remove,\r\n\t\thas    : has,\r\n\t\tkeys   : keys\r\n\t};\r\n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/cookie.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./src/cookie.js?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*!\r\n * @author liwei\r\n */\r\n\r\n!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {\r\n\t'use strict';\r\n\r\n\tvar base = __webpack_require__(1);\r\n\r\n\tvar IS_LOCAL_STORAGE_AVAILABLE = base.isStorageAvailable( 'localStorage' );\r\n\r\n\t/**\r\n\t * 设置一个 storage\r\n\t * @param {String} sKey   键名\r\n\t * @param {String} sValue 键值\r\n\t */\r\n\tfunction set( sKey, sValue ) {\r\n\t\tif ( IS_LOCAL_STORAGE_AVAILABLE ) {\r\n\t\t\tlocalStorage.setItem( sKey, sValue );\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t * 获取 storage\r\n\t * @param  {String} sKey 键名\r\n\t * @return {String}      键值\r\n\t */\r\n\tfunction get( sKey ) {\r\n\t\tif ( IS_LOCAL_STORAGE_AVAILABLE ) {\r\n\r\n\t\t\treturn localStorage.getItem( sKey );\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t * 清除所有 storage\r\n\t */\r\n\tfunction clear() {\r\n\t\tif ( IS_LOCAL_STORAGE_AVAILABLE ) {\r\n\r\n\t\t\tlocalStorage.clear();\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t * 删除一个 storage\r\n\t * @param  {String} sKey 键名\r\n\t */\r\n\tfunction remove( sKey ) {\r\n\t\tif ( IS_LOCAL_STORAGE_AVAILABLE ) {\r\n\r\n\t\t\tlocalStorage.removeItem( sKey );\r\n\t\t}\r\n\t}\r\n\r\n\treturn {\r\n\t\tset: set,\r\n\t\tget: get,\r\n\t\tclear: clear,\r\n\t\tremove: remove\r\n\t};\r\n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/localStorage.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./src/localStorage.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*!\r\n * @author liwei\r\n */\r\n\r\n\r\n!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {\r\n\t'use strict';\r\n\r\n\tvar base = __webpack_require__(1);\r\n\r\n\tvar IS_SESSION_STORAGE_AVAILABLE = base.isStorageAvailable( 'sessionStorage' );\r\n\r\n\t/**\r\n\t * 设置一个 storage\r\n\t * @param {String} sKey   键名\r\n\t * @param {String} sValue 键值\r\n\t */\r\n\tfunction set( sKey, sValue ) {\r\n\t\tif ( IS_SESSION_STORAGE_AVAILABLE ) {\r\n\r\n\t\t\tsessionStorage.setItem( sKey, sValue );\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t * 获取 storage\r\n\t * @param  {String} sKey 键名\r\n\t * @return {String}      键值\r\n\t */\r\n\tfunction get( sKey ) {\r\n\t\tif ( IS_SESSION_STORAGE_AVAILABLE ) {\r\n\r\n\t\t\treturn sessionStorage.getItem( sKey );\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t * 清除所有 storage\r\n\t */\r\n\tfunction clear() {\r\n\t\tif ( IS_SESSION_STORAGE_AVAILABLE ) {\r\n\t\t\t\r\n\t\t\tsessionStorage.clear();\r\n\t\t}\r\n\t}\r\n\r\n\t/**\r\n\t * 删除一个 storage\r\n\t * @param  {String} sKey 键名\r\n\t */\r\n\tfunction remove( sKey ) {\r\n\t\tif ( IS_SESSION_STORAGE_AVAILABLE ) {\r\n\r\n\t\t\tsessionStorage.removeItem( sKey );\r\n\t\t}\r\n\t}\r\n\r\n\treturn {\r\n\t\tset: set,\r\n\t\tget: get,\r\n\t\tclear: clear,\r\n\t\tremove: remove\r\n\t};\r\n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/sessionStorage.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./src/sessionStorage.js?");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_RESULT__;/**\n * @author rubyisapm\n */\n!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){\n    var base=__webpack_require__(1);\n    /**\n     * 将查询字符串解析为查询参数数组\n     * @param {string} search\n     */\n    function searchToParamGroup(search){\n        var paramGroup={};\n        if(search!==''){\n            search.replace(/(([^=?&]+)=([^=&]*))/g,function($0,$1,$2,$3){\n                paramGroup[$2]=$3;\n            });\n        }\n        return paramGroup;\n    }\n\n    /**\n     * URL解析并返回对应的参数\n     * @param {string} uri uri\n     * @returns {{protocol: *, hostname: *, port: *, pathname: *, search: *, hash: *, host: *}}\n     */\n    function uriParser(uri){\n        var parser = document.createElement('a');\n        parser.href = uri;\n        return {\n            protocol:parser.protocol,\n            hostname:parser.hostname,\n            port:parser.port,\n            pathname:parser.pathname,\n            search:parser.search,\n            hash:parser.hash,\n            host:parser.host\n        };\n    }\n\n    /**\n     * 获取url中指定参数的值\n     * @param {string} uri 要解析的url\n     * @param {string} param 要获取的查询参数的key值\n     * @returns {undefined | string}\n     */\n    function getParam(uri,param){\n        var paramGroup=searchToParamGroup(uriParser(uri).search);\n        if(!base.isEmptyObject(paramGroup)){\n            return paramGroup[param];\n        }\n    }\n\n    /**\n     * 获取url中的参数集合\n     * @param {string} uri 要解析的url\n     * @returns {object}\n     */\n    function getParamGroup(uri){\n        return searchToParamGroup(uriParser(uri).search);\n    }\n\n\n    return{\n        uriParser:uriParser,\n        getParamGroup:getParamGroup,\n        getParam:getParam,\n        searchToParamGroup:searchToParamGroup\n    };\n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/URIParser.js\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./src/URIParser.js?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("/**\n * Created by wx-wangxiang on 17/01/03.\n */\n!(module.exports = {\n\t//将字符串转化为数字\n\ttoInt: function(str){\n\t    return parseInt(str, 10) || 0;\n\t},\n\t/**\n\t * 补零操作\n\t * @param  {int} num    需要进行补零操作的参数\n\t * @param  {int} digits 想要拓展的位数\n\t * @return {string}     补零操作后的数字\n\t */\n\tzeroFill: function(num, digits) {\n\t\tvar num = '' + num; //将数字转为字符串的简便方法，同样的如果将数字字符串转为数字可以在其前面加上\"+\"号\n\t\twhile(num.length < digits) {\n\t\t\tnum = '0' + num;\n\t\t}\n\t\treturn num;\n\t}\n})\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/numberFormat.js\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./src/numberFormat.js?");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_RESULT__;/**\n * @author wangxiang\n */\n!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {\n\tvar numberFormat = __webpack_require__(7),\n\t\trdateFormat = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,\n    \traspnetjson = /^\\/Date\\((\\d+)\\)\\/$/, //匹配 /Date(12345)/ 类型的字符串\n\t\tDATE_FORMATS = {\n\t\tyyyy: dateGetter(\"FullYear\", 4), //对年份进行四位数的显示 如：2017/01/06\n\t\tyy: dateGetter(\"FullYear\", 2, 0, true), //对年份进行两位数的显示 如：17/01/06\n\t\ty: dateGetter(\"FullYear\", 1), //年份的一般的显示 如：2017/01/06\n\t\tMM: dateGetter(\"Month\", 2, 1), //对于月份的单个数字会进行补零, 如：2017/01/06\n\t  \tM: dateGetter(\"Month\", 1, 1), //对于月份的单个数字不会进行补零, 如：2017/1/06\n\t  \tdd: dateGetter(\"Date\", 2), //对于日期的单个数字会进行补零, 如：2017/01/06\n\t  \td: dateGetter(\"Date\", 1), //对于日期的单个数字不会补零, 如：2017/01/6\n\t  \tHH: dateGetter(\"Hours\", 2), //对于小时的单个数字会进行补零,并且是24小时制 如：2017/01/06 08:01\n\t  \tH: dateGetter(\"Hours\", 1), //对于小时的单个数字不会进行补零,并且是24小时制 如：2017/01/06 8:01\n\t  \thh: dateGetter(\"Hours\", 2, -12), //对于小时的单个数字会进行补零,并且是12小时制 如：2017/01/06 08:01\n\t  \th: dateGetter(\"Hours\", 1, -12), //对于小时的单个数字不会进行补零,并且是12小时制 如：2017/01/06 8:01\n\t  \tmm: dateGetter(\"Minutes\", 2), //对于分钟的单个数字会进行补零 如：2017/03/06 08:01\n\t  \tm: dateGetter(\"Minutes\", 1), //对于分钟的单个数字不会进行补零 如：2017/03/06 08:1\n\t  \tss: dateGetter(\"Seconds\", 2), //对于秒数的单个数字会进行补零 如：2017/03/06 08:01:09\n\t  \ts: dateGetter(\"Seconds\", 1), //对于秒数的单个数字会进行补零 如：2017/03/06 08:01:9\n\t};\n\t/**\n\t * 根据不同的日期format,获取相应的年，月，日，时，分，秒的显示格式\n\t * @param  {string} name   函数通过该参数执行不同的时间操作的方法\n\t * @param  {int} size   日期显示的位数\n\t * @param  {int} offset 时间显示的格式，12小时制还是24小时制(用于小时的显示)\n\t * @param  {boolean} trim   用于年份的两位数的显示\n\t * @return {Function}        返回数字格式化方法\n\t */\n\tfunction dateGetter(name, size, offset, trim) {\n\t    return function (date) {\n\t\t    var value = date[\"get\" + name]();\n\t\t    if (offset > 0 || value > -offset){\n\t\t      \tvalue += offset;\n\t\t    }\n\t\t    if (value === 0 && offset === -12) {\n\t\t      \tvalue = 12;\n\t\t    }\n\t\t    return padNumber(value, size, trim);\n\t\t}\n\t}\n\t/**\n\t * 数字格式化\n\t * @param  {int} num    获得的日期\n\t * @param  {[type]} digits 日期要显示的位数\n\t * @param  {boolean} trim   年份是否是两位数显示\n\t * @return {string}        返回格式化后的数字\n\t */\n\tfunction padNumber(num, digits, trim) {\n\t\tvar neg = '';\n\t\tif (num < 0) {\n\t\t    neg = '-';\n\t\t    num = -num;\n\t\t}\n\t\tnum = numberFormat.zeroFill(num, digits); //补零操作\n\t\tif (trim){\n\t\t    num = num.substr(num.length - digits);\n\t\t}\n\t\treturn neg + num;\n\t}\n\t/**\n\t * 日期格式化\n\t * @param  {obj} date   日期对象\n\t * @param  {string} format 格式化的方式\n\t * @return {string}        格式化后的日期\n\t */\n\tfunction dateFilter(date, format) {\n\t\tvar text = \"\",\n\t\t    parts = [],\n\t\t    fn, match;\n\t\tformat = format || \"yyyy-M-d\";\n\t\tif (typeof date === \"string\") {\n\t\t    if (/^\\d+$/.test(date)) {\n\t\t      \tdate = numberFormat.toInt(date);\n\t\t    } else if (raspnetjson.test(date)) { //匹配 '/Date(1483410908227)/' 类型的字符串\n\t\t      \tdate = +RegExp.$1; //RegExp.$1 表示前面raspnetjson.test()匹配到的第一个括号中的内容\n\t\t    } else {\n\t\t      \tconsole.error('请输入合法的日期');\n\t\t      \treturn;\n\t\t    }\n\t\t};\n\t\tif (typeof date === 'number') {\n\t\t    date = new Date(date);\n\t\t}\n\t\twhile (format) {\n\t\t    match = rdateFormat.exec(format);\n\t\t    /* istanbul ignore else */\n\t\t    if (match) {\n\t\t      \tparts = parts.concat(match.slice(1));\n\t\t      \tformat = parts.pop();\n\t\t    } else {\n\t\t      \tparts.push(format);\n\t\t      \tformat = null;\n\t\t    }\n\t\t}\n\t\tparts.forEach(function (value) {\n\t\t    fn = DATE_FORMATS[value];\n\t\t    text += fn ? fn(date) : value.replace(/(^'|'$)/g, \"\").replace(/''/g, \"'\");\n\t\t});\n\t\treturn text;\n\t}\n\n\treturn dateFilter\n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/dateFilter.js\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///./src/dateFilter.js?");

/***/ }
/******/ ])
});
;