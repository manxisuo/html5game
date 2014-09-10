(function(window){
	var Func = {};
	
	/**
	 * 建议直接使用Function.prototype.bind，这个函数只是写着玩的。
	 */
	Func.bind = function(fn, scope) {
		return function() {
			fn.apply(scope, arguments);
		};
	};
	
	window.Func = Func;
	
})(window);