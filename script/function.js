(function(window){
	var Func = {};
	
	Func.bind = function(fn, scope) {
		return function() {
			fn.apply(scope, arguments);
		};
	};
	
	window.Func = Func;
	
})(window);