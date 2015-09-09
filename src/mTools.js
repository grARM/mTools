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
	var mTools = {};
});