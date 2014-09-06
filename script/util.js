(function(window) {
	var Util = {};

	/**
	 * 返回N个数中的最小值. 至少需要提供一个参数.
	 */
	Util.min = function() {
		if (arguments.length == 1) {
			return arguments[0];
		}
		else {
			var a = arguments[0];
			var b = Util.min.apply(this, Array.prototype.slice.call(arguments, 1, arguments.length));

			return a <= b ? a : b;
		}
	};
	
	/**
	 * 返回N个数中的最大值. 至少需要提供一个参数.
	 */
	Util.max = function() {
		if (arguments.length == 1) {
			return arguments[0];
		}
		else {
			var a = arguments[0];
			var b = Util.max.apply(this, Array.prototype.slice.call(arguments, 1, arguments.length));

			return a >= b ? a : b;
		}
	};
	
	Util.minArrayItem = function(array) {
		return array.reduce(function(a, b){ return a <= b ? a: b; });
	};
	
	Util.maxArrayItem = function(array) {
		return array.reduce(function(a, b){ return a >= b ? a: b; });
	};

	/**
	 * 返回整数min和整数max之间的某个随机整数. 包括min, 不包括max.
	 */
	Util.rndRange = function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	Util.rndAmong = function() {
		var index = this.rndRange(0, arguments.length);
		return arguments[index];
	};

	Util.rndRGB = function() {
		var r = this.rndRange(0, 256);
		var g = this.rndRange(0, 256);
		var b = this.rndRange(0, 256);

		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	};

	Util.merge = function(target, source) {
		if (source) {
			for ( var p in source) {
				target[p] = source[p];
			}
		}

		return target;
	};

	Util.getAngle = function(dx, dy) {
		var PI = Math.PI;
		var angle;
		if (dx > 0) {
			if (dy >= 0)
				angle = Math.atan(dy / dx);
			else
				angle = Math.atan(dy / dx) + 2 * PI;
		}
		else if (dx == 0) {
			if (dy == 0)
				angle = 0;
			else
				angle = Math.atan(dy / dx);
			;
		}
		else {
			angle = Math.atan(dy / dx) + PI;
		}

		return angle;
	};

	Util.removeArrayItem = function(array, value) {
		var index;
		array.every(function(v, idx) {
			if (v == value) {
				index = idx;

				return false;
			}
			return true;
		});
		array.splice(index, 1);
	};
	
	Util.correctTo = function(number, n) {
		var zoom = Math.pow(10, n);
		return Math.round(zoom * number) / zoom;
	};

	window.Util = Util;
})(window);
