/**
 * @author rubyisapm
 */
define({
    /**
     * 获取字符串的字节长度
     * @param str
     * @returns {number}
     */
    getByteLen: function (str) {
        var str1=str.replace(/([^\x00-\xff])/ig,'$1 ');
        return str1.length;
    },
    /**
     * 按字节截取内容
     * @param source 原字符串
     * @param length 要截取的长度
     * @param halfCut 是否要舍弃半个中文
     * @returns {string}
     */
    subByte: function (source,length,halfCut) {
        var sliced=(source + '').substr(0, length).replace(/([^\x00-\xff])/g, '$1 ').substr(0, length).replace(/([^\x00-\xff]) /g, '$1');
        if(halfCut && this.getByteLen(sliced)>length){
            sliced=sliced.substr(0,sliced.length-1);
        }
        return sliced;
    },
    /**
     * 将字符串的首字母大写
     * @param {string} str 原字符串
     * @returns {string} 转换后的字符串
     */
    upperCaseFirst: function (str) {
        str = str + '';
        return str.replace(/^[a-z]/, function (firstLetter) {
            return firstLetter.toUpperCase();
        })
    },
    /**
     * 将字符串的首字母小写
     * @param {string} str 原字符串
     * @returns {string} 转换后的字符串
     */
    lowerCaseFirst: function (str) {
        str = str + '';
        return str.replace(/^[A-Z]/, function (firstLetter) {
            return firstLetter.toLowerCase();
        })
    },
    /**
     * 判断一个值是不是window对象
     * @param obj
     * @returns {boolean}
     */
    isWindow: function (obj) {
        return obj != null && obj === obj.window;
    },
    /**
     * 判断一个值是不是数组
     * @param {*} val 要判断的值
     * @returns {boolean} 是否为数组
     */
    isArray: function (val) {
        return Array.isArray(val);
    },
    /**
     * 判断一个值是不是对象
     * @param {*} val 要判断的值
     * @returns {boolean} 是否为数组
     */
    isObject: function (val) {
        return typeof val === 'object' && !this.isArray(val);
    },
    /**
     * 判断一个值是不是纯文本对象
     * 即其属性不是对象/dom节点/window
     * @param obj
     * @returns {boolean}
     */
    isPlainObject: function (obj) {
        if (!this.isObject(obj) || obj.nodeType || this.isWindow(obj)) {
            return false;
        }
        if (obj.constructor && !obj.constructor.prototype.hasOwnProperty('isPrototypeOf')) {
            return false;
        }
        return true;
    },
    /**
     * 判断一个值是不是JSON
     * @param val
     * @returns {boolean}
     */
    isJSON: function (val) {
        try {
            var result = JSON.parse(val);
            return typeof result === 'object';
        } catch (e) {
            return false;
        }
    },
    /**
     * 判断一个值是不是函数
     * @param val
     * @returns {boolean}
     */
    isFunction: function (val) {
        return typeof val === 'function';
    },
    /**
     * 判断一个值是不是正则表达式
     * @param obj
     * @returns {boolean}
     */
    isRegExp: function (obj) {
        return Object.prototype.toString.call(obj) === "[object RegExp]";
    },

    extend: function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !this.isFunction(target)) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if (( options = arguments[i] ) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ( this.isPlainObject(copy) ||
                        ( copyIsArray = this.isArray(copy) ) )) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && this.isArray(src) ? src : [];

                        } else {
                            clone = src && this.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = this.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    },

    /**
     * 检测对象是否为空对象
     * @param {?Object} obj 要检测的对象，null会被检测为空对象
     * @returns {boolean}
     */
    isEmptyObject: function (obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    },

    /**
     * 获取一个对象中具体key[组]的值，原样输出，如果为引用类型则保持引用
     * @param {Object|Array} obj 对象
     * @param {String} key key[组]
     * @returns {*} key[组]对应的值
     */
    getObjValByKey: function (obj, key) {
        key = key.split('.');
        var result = obj;
        key.map(function (item) {
            result = result[item];
        });
        return result;
    },
    /**
     * 设置一个对象中具体key[组]的值，可以为具体的值或者处理方法
     * @param {Object} obj 对象
     * @param {String} key key[组]
     * @param {*} valOrFn 设置的值或者处理方法(方法接受两个参数:key所在的对象，最后的key)
     * @returns {*}
     */
    setObjValByKey:function(obj,key,valOrFn){
        var that=this;
        key = key.split('.');
        var result={},
            targetClone = JSON.parse(JSON.stringify(obj)),
            pointer=[targetClone];
        //targetClone用于逐渐定位至目标key
        if(typeof that.setObjValByKey.$rules==='undefined'){
            //内置规则
            that.setObjValByKey.$rules= {
                '$null2str':function(obj,key){
                    if(obj[key]===null){
                        obj[key]='';
                    }
                },// null -> ''
                '$null2zero':function(obj,key){
                    if(obj[key]===null){
                        obj[key]=0;
                    }
                },// null -> 0
                '$null2arr':function(obj,key){
                    if(obj[key]===null){
                        obj[key]=[];
                    }
                },// null -> []
                '$null2obj':function(obj,key){
                    if(obj[key]===null){
                        obj[key]={};
                    }
                },// null -> {}
                '$empty2zero-strict':function(obj,key){
                    if(obj[key]===''){
                        obj[key]=0;
                    }
                },// '' -> 0
                '$empty2zero-relaxed':function(obj,key){
                    if(/^\s*$/.test(obj[key])){
                        obj[key]=0;
                    }
                },// '  ' || '' -> 0
                '$trim':function(obj,key){
                    if(typeof obj[key]==='string'){
                        obj[key]=obj[key].replace(/(^\s*|\s*$)/g, '');
                    }
                }// 去掉前后空格
            };
        }

        key.map(function (key,index,arr) {
            if(index===arr.length-1 && typeof pointer[pointer.length-1]!=='undefined'){
                if(!that.isObject(pointer[pointer.length-1])){
                    console.log('warning from ct-ct-utility:setObjValBykey中key所属的不是一个对象(你可能正在给非对象添加属性!)');
                }
                if(typeof valOrFn==='function'){
                    valOrFn(pointer[pointer.length-1],key);
                }else if(typeof valOrFn==='string' && valOrFn.indexOf('$')===0 && typeof that.setObjValByKey.$rules[valOrFn] !=='undefined'){
                    //当匹配到内置规则时，使用内置规则对目标值做转换
                    that.setObjValByKey.$rules[valOrFn](pointer[pointer.length-1],key);
                }else{
                    pointer[pointer.length-1][key]=valOrFn;
                }
            }else{
                if(typeof pointer[pointer.length-1][key]!=='undefined'){
                    pointer.push(pointer[pointer.length-1][key]);
                }
            }
        });
        //在原对象中更新targetClone对目标key的变化
        this.extend(true,result,obj,targetClone);
        return result;
    },

    /**
     * 判断浏览器是否支持storage
     * @param {string} type 'localStorage'/'sessionStorage'
     * @returns {boolean}
     */
    isStorageAvailable: function (type) {
        try {
            var x = '__storage_test__',
                storage = window[type];
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return false;
        }
    }
})
;