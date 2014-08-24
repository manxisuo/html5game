(function(window) {

	function Brush(ctx) {
		this.ctx = ctx;
		this.canvas = ctx.canvas;
	}

	/**
	 * 移动画笔到某个位置.
	 */
	Brush.prototype.moveTo = function(x, y) {
		var ctx = this.ctx;
		ctx.moveTo(x, y);

		return this;
	};

	/**
	 * 画直线. 指定终点, 起点为画笔当前位置.
	 */
	Brush.prototype.lineTo = function(x, y) {
		var ctx = this.ctx;
		ctx.lineTo(x, y);
		ctx.moveTo(x, y);
		ctx.closePath();
		ctx.stroke();

		return this;
	};

	/**
	 * 画直线. 指定起点和终点.
	 */
	Brush.prototype.line = function(x1, y1, x2, y2) {
		var ctx = this.ctx;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.closePath();
		ctx.stroke();

		return this;
	};

	/**
	 * 画二次贝塞尔曲线. 指定终点, 起点为画笔当前位置.
	 */
	Brush.prototype.quadraticCurveTo = function(cp1x, cp1y, x, y) {
		var ctx = this.ctx;
		ctx.quadraticCurveTo(cp1x, cp1y, x, y);
		ctx.moveTo(x, y);
		ctx.closePath();
		ctx.stroke();

		return this;
	};

	/**
	 * 画三次贝塞尔曲线. 指定终点, 起点为画笔当前位置.
	 */
	Brush.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
		var ctx = this.ctx;
		ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
		ctx.moveTo(x, y);
		ctx.closePath();
		ctx.stroke();

		return this;
	};

	/**
	 * 填充文字.
	 */
	Brush.prototype.fillText = function(text, x, y, font) {
		if (font)
			ctx.font = font;
		ctx.fillText(text, x, y);

		return this;
	};

	/**
	 * 描边文字.
	 */
	Brush.prototype.strokeText = function(text, x, y, font) {
		if (font)
			ctx.font = font;
		ctx.strokeText(text, x, y);

		return this;
	};

	/**
	 * 画圆.
	 */
	Brush.prototype.circle = function(x, y, r) {
		var ctx = this.ctx;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI * 2, true);
		ctx.closePath();

		return this;
	};

	/**
	 * 画矩形.
	 */
	Brush.prototype.rect = function(x, y, w, h) {
		var ctx = this.ctx;
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		ctx.closePath();

		return this;
	};

	/**
	 * 填充当前路径.
	 */
	Brush.prototype.fill = function(style) {
		this.fillStyle(style);
		this.ctx.fill();

		return this;
	};

	/**
	 * 描边当前路径.
	 */
	Brush.prototype.stroke = function(style) {
		this.strokeStyle(style);
		this.ctx.stroke();

		return this;
	};

	/**
	 * 清空画布.
	 */
	Brush.prototype.clear = function(style) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (style) {
			ctx.save();
			ctx.fillStyle = style;
			this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.fill();
			ctx.restore();
		}

		return this;
	};

	/**
	 * 设置填充样式.
	 */
	Brush.prototype.fillStyle = function(style) {
		if (style)
			this.ctx.fillStyle = style;

		return this;
	};

	/**
	 * 设置描边样式.
	 */
	Brush.prototype.strokeStyle = function(style) {
		if (style)
			this.ctx.strokeStyle = style;

		return this;
	};

	/**
	 * 设置全家透明度.
	 */
	Brush.prototype.alpha = function(alpha) {
		if (alpha)
			this.ctx.globalAlpha = alpha;

		return this;
	};

	/**
	 * 画图. image, x, y是必选的. rotate是可选的. width和height要么同时提供, 要么同时不提供.
	 */
	Brush.prototype.image = function(image, x, y, width, height, rotate) {
		var ctx = this.ctx;
		var len = arguments.length;
		var w;
		var h;
		var angle = 0;

		ctx.save();

		if (len == 3 || len == 4) {
			w = image.width;
			h = image.height;
		} else {
			w = width;
			h = height;
		}

		// ctx.translate(x + w / 2, y + h / 2);
		ctx.translate(x, y);

		if (len == 4 || len == 6)
			angle = arguments[len - 1];

		if (angle != 0)
			ctx.rotate(angle);

		ctx.drawImage(image, -w / 2, -h / 2, w, h);

		ctx.restore();

		return this;
	};

	window.Brush = Brush;

})(window);