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
	var mToolsBase = {
		isArray: function(arr){
			return Object.prototype.toString.call(arr) === '[object Array]';
		},
		each: function (obj, fn){
			var len = obj.length,i = 0;

			if(this.isArray(obj)){
				//如果是数组
				for(; i<len; i++){
			       if ( false === fn.call(obj[i],i+1,obj[i]) ){
			          break;
			       }
			    }
			}else{
				//如果是对象
			     for( i in obj ){
			        if(false === fn.call(obj[i], obj[i], i)){break;}
			     }
			}
		}
	};

	var mTools = {
		isArray: mToolsBase.isArray,
		each: mToolsBase.each

	};

	return mTools;
});