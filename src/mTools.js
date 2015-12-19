/*
 * mTools
 */
;(function (factory){
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define(factory);
	} else {
		 
		// Browser globals
		mTools = factory();
	}
})(function(){
	var root = this;
	var previousMTools = root.mTools;
	/*
	 * 基础通用方法
	 */
	var base = {
		/*tpye*/
		isArray: function (arr){
			return Object.prototype.toString.call(arr) === '[object Array]';
		},
		isFunction: function (fn){
			return Object.prototype.toString.call(fn) === '[Object Function]';
			//return (fn && typeof fn === "function") || false;
		},
		isObject: function (obj){
			var type = typeof obj;
    		return type === 'function' || type === 'object' && !!obj;
		},
		/**
		 * Object
		 */
		hasKey: function(obj, key){
			return obj !== null && hasOwnProperty.call(obj, key);
		},
		getKeys: function (obj){
			if(!this.isObject(obj)){return [];}
			var keys = [];
			for (var key in obj){
				if(this.hasKeys(obj, key)){
					keys.push(key);
				}
			}
			return keys;
		},
		getSize: function(obj){
			if (obj == null) return 0;
			if(this.isArray(obj)){
				return obj.length;
			}else if(this.isObject){
				return this.getKeys(obj).length;
			}else{
				return 0;
			}
		},
		getValues: function (obj){
			if(!this.isObject(obj)){return [];}
			var values = [];
			for (var key in obj){
				if(this.hasKeys(obj, key)){
					values.push(obj[key]);
				}
			}
			return values;
		},
		isEmpty: function (obj){
			if (obj === null) return true;
			if (this.isArray(obj)){
				return obj.length === 0;
			}else if(this.isObject(obj)){
				return this.getKeys(obj).length === 0;
			}else{
				return false;
			}
		},
		merge: function(root){
			for(var i = 1; i < arguments.length; i++){
				for(var key in arguments[i]){
					root[key] = arguments[i][key];
				}
			}
			return root;
		},
		/* array*/
		maxInArray: function(arr){
			return Math.max.apply(Math, arr);
		},
		minInArray: function(arr){
			return Math.min.apply(Math, arr);
		},
		/*function*/
		overload: function(object, name, fn){
			var old = object[name];
			object[name] = function(){
				if(fn.length == arguments.length){
					return fn.apply(this, arguments);
				}else if(typeof old == 'function'){
					return old.apply(this, arguments);
				}
			};
		},
		/*type Change*/
		toInt: function(value){
			// return ~~(value);
			return (value) | 0;
		},
		toBool: function(value){
			return !!(value);
		},
		each: function (obj, fn){
			var len = obj.length,i = 0;

			if(this.isArray(obj)){
				//如果是数组
				for(; i<len; i++){
			       	if ( false === fn.call(obj[i], obj[i], i) ){break;}
			    }
			}else{
				//如果是对象
			    for( i in obj ){
			    	if(this.hasKeys(obj, i)){
			    		if(false === fn.call(obj[i],i+1,obj[i])){break;}
			    	}
			    }
			}
		},
		objParmasCheck: function(str, context){
			var pointIndex = str.indexOf('.');
			if(!context){context = window;}

			if(pointIndex == -1 && !(!context[str])){
				return true;
			}else{
				var paramsLeft = context[str.slice(0, pointIndex)];
				var strRight = str.substr(pointIndex + 1, str.length - pointIndex - 1);
				return !(!paramsLeft) && base.objParmasCheck(strRight, paramsLeft);
			}
		},
		noConflict: function(){
			root.mTools = previousMTools;
			return this;
		}

	};


	/*
	 * 正则相关方法
	 */
	var regCheck = {
		'isIdcard': function(strId){
            var patrn = /^\s*\d{15}\s*$/;
            var patrn1 = /^\s*\d{16}[\dxX]{2}\s*$/;
            if(!patrn.exec(strId) && !patrn1.exec(strId)){return false;}
            return true;
        },
        'isName': function(strName){
            var onlyName = strName.split('·').join('');
            var patrn = /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/; 
            if(!patrn.exec(onlyName)){return false;}
            return true;
        },
        'isMobilePhone': function(strPhone){
            var  patrn = /^[1][0-9]{10}$/;
            if(!patrn.exec(strPhone)){return false;}
            return true;
        },
        'isNumber': function(strNumber){
        	var patrn = /^[0-9]*$/;
        	if(!patrn.exec(strNumber)){return false;}
        	return true;
        }
	};


	/*
	 * 浏览器相关方法
	 */
	var browser = {
		browsers: [],
		isBrowser: function(browserUAName){
			return base.hasKey(browser.browsers, browserUAName)? 
			browser.browsers[browserUAName] : 
			browser.browsers[browserUAName] = (window.navigator.userAgent.toLowerCase().indexOf(browserUAName) === -1) ? false: true;
		},
		isIos: function(){return browser.isBrowser('iphone');},
		isAndroid: function(){return browser.isBrowser('android');},
		isWeiXin: function(){return browser.isBrowser('micromessenger');},
		isUC: function(){return browser.isBrowser('ucbrowser');},
		isQQ: function(){return browser.isBrowser('mqqbrowser');},
		isSafari: function(){return browser.isBrowser('safari');}
	};

	/*
	 * url
	 */
	var urlParse = {
		createLink: function (url){
			var aUrl = url;
			if(!aUrl || aUrl === ''){
				aUrl = location.href;
			}
			var a = document.createElement('a');
			a.href = aUrl;
			return {
				source: aUrl,
		        protocol: a.protocol.replace(':',''),
		        host: a.hostname,
		        port: a.port,
		        query: a.search,
		        params: (function(){
		            var ret = {},
		                seg = a.search.replace(/^\?/,'').split('&'),
		                len = seg.length, i = 0, s;
		            for (;i<len;i++) {
		                if (!seg[i]) { continue; }
		                s = seg[i].split('=');
		                ret[s[0]] = s[1];
		            }
		            return ret;
		        })(),
		        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
		        hash: a.hash.replace('#',''),
		        path: a.pathname.replace(/^([^\/])/,'/$1'),
		        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
		        segments: a.pathname.replace(/^\//,'').split('/')
			}
		},
		getHash: function (){

		},
		getSearch: function(){

		}

	};

	/*
	 * cookie
	 */
	var cookie = {
		setCookie: function (key, value, expiredays){
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+expiredays);
			document.cookie=key+ "=" +escape(value)+((expiredays === null) ? "" : ";expires="+exdate.toGMTString());
		},
		getCookie: function(key){
			if (document.cookie.length > 0) {
			    c_start = document.cookie.indexOf(key + "=");
			    if (c_start != -1) {
			        c_start = c_start + key.length + 1;
			        c_end = document.cookie.indexOf(";", c_start);
			        if (c_end == -1) c_end = document.cookie.length;
			        return unescape(document.cookie.substring(c_start, c_end));
			    }
			}
			return "";
		}
	};

	/*
	 * load
	 */
	var loader = {
		imgLoader: function(imgs, cb){
			setTimeout(function(){
				var imgsLen = imgs.length;
				var count = 0;
				base.each(imgs, function (v_img, i_img){
					(function (v_img, i_img){
						var imgItem = document.createElement("img");
						imgItem.setAttribute("style", "display:none;");
						imgItem.setAttribute("src", v_img);
						var imgD = document.body.appendChild(imgItem);
						imgD.onload = function(){
							count += 1;
							if(base.isFunction(cb)){
								cb({
									"count": count,
									"length": imgsLen,
									"img": v_img
								});
							}
							imgD.parentNode.removeChild(imgD); 
						};
					})(v_img, i_img);
				});
			}, 1);

		}
	};

	/**
	 * template
	 */
	var template = {
		tmpl: function(str, data){
		    var fn = new Function("obj", "var p=[];"+
		                 "with(obj){p.push('" +
		                 str
		                    .replace(/[\r\t\n]/g, " ")
		                    .replace(/'/g, "\r") //全部单引号替换为\r
		                    .split("<%").join("\t") 
		                    .replace(/\t=(.*?)%>/g, "',$1,'")
		                    .split("\t").join("');")
		                    .split("%>").join("p.push('")
		                    .replace(/\r/g, "\\'")           // 置换回单引号
		                 + "');}return p.join('');");
		 
		    return data ? fn( data ) : fn;
		}
	}

	/****************************************************************
	 * public
	 */
	var mTools = {
		/*base*/
		toBool: base.toBool,
		toInt: base.toInt,
		isArray: base.isArray,
		isFunction: base.isFunction,
		isObject: base.isObject,
		isEmpty: base.isEmpty,
		hasKeys: base.hasKeys,
		getKeys: base.getKeys,
		objParmasCheck: base.objParmasCheck,
		each: base.each,
		/*reg*/
		isIdcard: regCheck.isIdcard,
		isName: regCheck.isName,
		isMobile: regCheck.isMobilePhone,
		isNumber: regCheck.isNumber,
		/*browser*/
		isQQ: browser.isQQ,
		isIos: browser.isIos,
		isAndroid: browser.isAndroid,
		isSafari: browser.isSafari,
		isUC: browser.isUC,
		isWeiXin: browser.isWeiXin,
		/*cookie*/
		setCookie: cookie.setCookie,
		getCookie: cookie.getCookie,
		/*load*/
		imgLoader: loader.imgLoader,
		template: template.tmpl,
		noConflict: base.noConflict
	};

	return mTools;
});