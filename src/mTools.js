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
	/*
	 * 基础通用方法
	 */
	var base = {
		isArray: function(arr){
			return Object.prototype.toString.call(arr) === '[object Array]';
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
			       if(false === fn.call(obj[i],i+1,obj[i])){break;}
			    }
			}
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
		isIos: function(){
			return navigator.userAgent.indexOf("iPhone")>=0 ? true: false;
		},
		isWeiXin: function(){
			return /micromessenger/i.test(navigator.userAgent.toLowerCase());
		}
	};

	/*
	 * url
	 */
	var urlParse = {};

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
							cb && cb({
								"count": count,
								"length": imgsLen,
								"img": v_img
							});
							imgD.parentNode.removeChild(imgD); 
						};
					})(v_img, i_img);
				});
			}, 1);

		}
	};

	/****************************************************************
	 * public
	 */
	var mTools = {
		/*base*/
		isArray: base.isArray,
		each: base.each,
		/*reg*/
		isIdcard: regCheck.isIdcard,
		isName: regCheck.isName,
		isMobile: regCheck.isMobilePhone,
		isNumber: regCheck.isNumber,
		/*browser*/
		isIos: browser.isIos,
		isWeiXin: browser.isWeiXin,
		/*load*/
		imgLoader: loader.imgLoader
	};

	return mTools;
});