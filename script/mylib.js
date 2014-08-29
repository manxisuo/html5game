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
		var ctx = this.ctx;
		if (font)
			ctx.font = font;
		ctx.fillText(text, x, y);

		return this;
	};

	/**
	 * 填充指定颜色的文字.
	 */
	Brush.prototype.fillTextWithColor = function(text, x, y, color, font) {
		var ctx = this.ctx;
		if (font)
			ctx.font = font;

		ctx.save();
		ctx.fillStyle = color;
		ctx.fillText(text, x, y);
		ctx.restore();

		return this;
	};

	/**
	 * 描边文字.
	 */
	Brush.prototype.strokeText = function(text, x, y, font) {
		var ctx = this.ctx;
		if (font)
			ctx.font = font;
		ctx.strokeText(text, x, y);

		return this;
	};

	/**
	 * 描边指定颜色的文字.
	 */
	Brush.prototype.strokeTextWithColor = function(text, x, y, color, font) {
		var ctx = this.ctx;
		if (font)
			ctx.font = font;

		ctx.save();
		ctx.strokeStyle = color;
		ctx.strokeText(text, x, y);
		ctx.restore();

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
		var ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (style) {
			ctx.save();
			ctx.fillStyle = style;
			ctx.rect(0, 0, this.canvas.width, this.canvas.height);
			ctx.fill();
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
	 * 画图. 
	 * image, x, y是必选的. rotate是可选的. width和height要么同时提供, 要么同时不提供.
	 * 注意: x和y不是图片左上角的坐标, 是图片中心的坐标.
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
		}
		else {
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
	
	Brush.prototype.sliceImage = function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
		this.ctx.drawImage.apply(this.ctx, arguments);
	};
	
	Brush.prototype.translate = function() {
		this.ctx.translate.apply(this.ctx, arguments);
	};
	
	Brush.prototype.rotate = function() {
		this.ctx.rotate.apply(this.ctx, arguments);
	};
	
	Brush.prototype.transform = function() {
		this.ctx.transform.apply(this.ctx, arguments);
	};
	
	Brush.prototype.save = function() {
		this.ctx.save.apply(this.ctx, arguments);
	};
	
	Brush.prototype.restore = function() {
		this.ctx.restore.apply(this.ctx, arguments);
	};


	window.Brush = Brush;

})(window);

(function(window) {

	/**
	 * config: times, period, util, afterStop, scope
	 */
	function Animation(renderFn, type, config) {
		this.renderFn = renderFn || function() {
		};
		this.type = type || Animation.CONTINOUS;

		this.times = 0;
		this.period = 0;

		Util.merge(this, config);
	}

	Animation.CONTINOUS = 1;
	Animation.TIMES = 2;
	Animation.PERIOD = 3;
	Animation.UNTIL = 4;

	function Manager(interval) {
		this.animations = [];
		this.timerId = -1;
		this.running = false;
		this.clearCanvasFn = null;
		this.interval = interval == undefined ? 50 : interval;
		this.backupInterval = undefined;
	}

	/**
	 * 增加一个动画. 如果之前动画管理器没有启动, 将触发其启动.
	 */
	Manager.prototype.add = function(renderFn, type, config) {

		var animation;

		if (arguments[0] instanceof Animation) {
			animation = arguments[0];
		}
		else {
			animation = new Animation(renderFn, type, config);
		}

		if (animation.type == Animation.PERIOD) {
			animation.times = Math.round(animation.period / this.interval);
		}

		this.animations.splice(0, 0, animation);

		if (!this.running) {
			this.start();
		}

		return animation;
	};

	function checkCompleted(animation) {
		if (null == animation)
			return true;

		var complete = false;

		if (animation.type == Animation.PERIOD || animation.type == Animation.TIMES) {
			if ((animation.times--) == 0) {
				complete = true;
			}
		}
		else if (animation.type == Animation.UNTIL) {
			if (animation.util == undefined || animation.util()) {
				complete = true;
			}
		}

		return complete;
	}

	/**
	 * 开始动画播放.
	 */
	Manager.prototype.start = function() {

		var me = this;
		var animations = me.animations;

		var current;
		if (!me.running && animations.length > 0) {
			me.timerId = setInterval(function() {

				// 清空画布
				if (me.clearCanvasFn) {
					me.clearCanvasFn();
				}

				// 渲染所有动画的帧.
				// 为了能够在循环中删除元素, 所以采用了逆序循环. 而添加元素时, 是放到数组开始的.
				// 这样一来, 最后添加的动画将会位于顶层.
				for ( var i = animations.length - 1; i >= 0; i--) {
					current = animations[i];

					if (checkCompleted(current)) {
						if (current.afterStop) {
							current.afterStop.apply(current.scope || window);
						}
						animations.splice(i, 1);
						continue;
					}
					else {
						current.renderFn.apply(current.scope || window);
					}
				}

				if (animations.length == 0) {
					me.stop();
				}

			}, me.interval);

			me.running = true;
		}
	};

	/**
	 * 停止动画播放. 可通过start重新恢复.
	 */
	Manager.prototype.stop = function() {
		var me = this;
		if (me.running) {
			clearInterval(me.timerId);
			me.timerId = -1;
			me.running = false;
		}
	};

	/**
	 * 重新设置每帧的持续时间.
	 */
	Manager.prototype.setInterval = function(interval) {
		var me = this;

		if (typeof interval == 'number' && interval > 0) {
			if (interval < 1) {
				interval = 1;
			}

			if (me.running) {
				me.stop();
				me.interval = interval;
				me.start();
			}
			else {
				me.interval = interval;
			}

			me.backupInterval = undefined;
		}
	};

	/**
	 * 改变动画的播放速度.
	 * 
	 * @param ratio 变速的比例. 大于1时加速, 小于1时减速, 等于1时速度不变.
	 */
	Manager.prototype.speedUp = function(ratio) {
		var me = this;

		if (typeof ratio == 'number' && ratio > 0) {

			if (ratio == 1 || ratio > 1 && this.interval == 1) { return; }

			// 只有第一次调过speedUp时, 才进行备份. (在调restoreSpeed恢复速度后, 将重新计数.)
			if (me.backupInterval == undefined) {
				me.backupInterval = me.interval;
			}

			var newInterval = me.interval / ratio;
			if (newInterval < 1) {
				newInterval = 1;
			}

			// 使新的interval产生作用
			if (me.running) {
				me.stop();
				me.interval = newInterval;
				me.start();
			}
			else {
				me.interval = newInterval;
			}
		}
	};

	/**
	 * 恢复变速前的速度.
	 */
	Manager.prototype.restoreSpeed = function() {
		if (this.backupInterval != undefined) {
			this.setInterval(this.backupInterval);
			this.backupInterval = undefined;
		}
	};

	/**
	 * 停止动画, 并清空动画列表.
	 */
	Manager.prototype.clear = function() {
		this.stop();
		this.animations = [];
	};

	Manager.prototype.setClearCanvasFn = function(fn) {
		this.clearCanvasFn = fn;
	};

	window.Animation = Animation;
	window.AnimationManager = Manager;
})(window);
