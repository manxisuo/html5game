var canvas;
var sound;

var INTERVAL = 25;
var SPEED_RATIO = 1.02;
var zoom = 1; // 当前用户加速/减速的比例
var zoomTip;
var manager;

// 全局数据
var bg_list = ['floor2-2.jpg', 'floor5-2.jpg', 'floor3-2.jpg', 'floor6-2.jpg'];
var image;
var brush;

// 每次游戏(关卡)的数据
var gameCount = 0; // 关卡序号
var bugs = [];
var bug_total = 0;
var currentCount = bug_total;
var startTime; // 本关卡开始时间

// 全局初始化
function main() {
	init();
	drawWelcomePage();
}

function init() {
	canvas = $('#canvas')[0];
	canvas.width = $(window).width();
	canvas.height = $(window).height();

	sound = $('#sound')[0]

	image = $('#image_source')[0];

	PopWin.init();

	$(canvas).on('touchstart', function(e) {
		e.preventDefault();
	});

	$(document).on('scrollstart', function(e) {
		e.preventDefault();
	});

	$(canvas).on('swiperight', function(e) {
		e.preventDefault();

		zoom *= 1.1;
		manager.speedUp(1.1);
		drawZoomTip('速度X' + Util.correctTo(zoom, 2), 10, canvas.height - 10, 500)
	});

	$(canvas).on('swipeleft', function(e) {
		e.preventDefault();

		zoom /= 1.1;
		manager.speedUp(1 / 1.1);
		drawZoomTip('速度X' + Util.correctTo(zoom, 2), 10, canvas.height - 10, 500)
	});

	$(canvas).on('taphold', function(e) {
		e.preventDefault();

		// 恢复原速率
		manager.speedUp(1 / zoom);
		zoom = 1;
		drawZoomTip('速度X' + Util.correctTo(zoom, 2), 10, canvas.height - 10, 500)
	});

	$(canvas).on('touchmove', function(e) {
		e.preventDefault();
	});

	brush = new Brush(canvas.getContext('2d'));
	manager = new AnimationManager(INTERVAL);
	manager.setClearCanvasFn(function() {
		brush.clear();
	});
}

function drawZoomTip(tip, x, y, period) {
	manager.remove(zoomTip);
	zoomTip = manager.add(function(count, duration) {
		brush.fillTextWithColor(tip, x, y, 'blue', 30 + 'px Calibri');
	}, Animation.PERIOD, {
		period: period
	});
}

function drawWelcomePage() {
	var bug = new Bug({
		x: canvas.width / 2,
		y: canvas.height / 2,
		angle: -Math.PI / 2,
		dx: 1,
		dy: 1,
		width: 200,
		height: 200,
		image: image,
	});

	manager.add(function() {
		brush.strokeText('一起打小强', canvas.width / 2 - 125, 100, '50px sans-serif');

		bug.render(brush);
		bug.rotate(Math.PI / (1000 / INTERVAL));

	}, Animation.CONTINOUS);

	var fn = function(e) {
		e.preventDefault();

		manager.clear();
		$(canvas).unbind('tap');
		newLevel();
	};

	$(canvas).on('tap', fn);

	resetBackground();
}

// 结束游戏时清理数据
function endGame() {
	gameCount = 0;
}

function checkKnock(e) {
	e.preventDefault();

	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	var knockedBugs = searchKnockedBug(x, y);

	// 文字和声音提示
	if (knockedBugs.length > 0) {
//		sound.pause();
		sound.currentTime = 0;
		sound.play();
		
		knockedBugs.forEach(function(bug) {
			bug.markKilled();
		});

		drawTip('+' + knockedBugs.length, x, y, 500);
	}

	// 判断是否已经全部消灭
	currentCount -= knockedBugs.length;
	if (currentCount <= 0) {
		var totalTime = Math.floor((new Date().getTime() - startTime) / 1000);
		endLevel(totalTime);
	}
}

function drawTip(tip, x, y, period) {
	manager.add(function(count, duration) {
		brush.fillTextWithColor(tip, x, y, 'blue', (20 + count) + 'px Calibri');
	}, Animation.PERIOD, {
		period: period
	});
}

function searchKnockedBug(x, y) {
	var results = [];
	var bug;

	for ( var i = 0; i < bugs.length; i++) {
		bug = bugs[i];

		if (!bug.isKilled() & Math.abs(x - bug.x) <= bug.width / 2 + 20) {
			if (Math.abs(y - bug.y) <= bug.height / 2 + 20) {
				results.push(bug);
			}
		}
	}

	return results;
}

// 新游戏初始化
function newLevel() {
	gameCount++;
	bug_total = gameCount * 2;
	currentCount = bug_total;
	zoom = 1;

	bugs = [];
	for ( var i = 0; i < bug_total; i++) {
		bugs.push(makeBug());
	}

	// 设置背景
	setBackground(gameCount);

	startTime = new Date().getTime();

	// 加速
	manager.speedUp(Math.pow(SPEED_RATIO, gameCount - 1));

	// 周期任务
	manager.add(draw, Animation.CONTINOUS);

	// 增加监听器
	$(canvas).on('tap', checkKnock);
}

function endLevel(totalTime) {
	// 删除监听器
	$(canvas).unbind('tap');

	// 停止动画并重置速度
	manager.clear();
	manager.restoreSpeed();

	var tip = '恭喜你, 已全部消灭(共' + bug_total + '个)! 耗时' + totalTime + '秒. 继续下一关?';

	brush.clear();

	PopWin.confirm('提示', tip, function() {
		newLevel();
	}, function() {
		endGame();
		drawWelcomePage();
	});
}

/**
 * bug可以为空.
 */
function makeBug(bug) {
	var x, y;
	var type = Util.rndAmong(true, false);

	if (type) {
		x = Util.rndAmong(0, canvas.width);
		y = Util.rndRange(0, canvas.height);
	}
	else {
		x = Util.rndRange(0, canvas.width);
		y = Util.rndAmong(0, canvas.height);
	}

	var angle = Util.getAngle(canvas.width / 2 - x, canvas.height / 2 - y);
	var dr = INTERVAL / 5;
	var dx = dr * Math.cos(angle);
	var dy = dr * Math.sin(angle);

	var config = {
		x: x,
		y: y,
		dx: dx,
		dy: dy,
		image: image,
	};

	if (bug) {
		Util.merge(bug, config);
		return bug;
	}
	else {
		return new Bug(config);
	}
}

function setBackground(gameCount) {
	if (gameCount != 0) {
		var index = gameCount % bg_list.length;
		var image = 'url(image/' + bg_list[index] + ')';
		$('html').css('background-image', image);
	}
	else {
		$('html').css('background-image', '');
	}
}

function resetBackground() {
	$('html').css('background-image', '');
}

function draw() {
	var bug;
	for ( var i = 0; i < bugs.length; i++) {
		bug = bugs[i];
		if (!bug.isKilled()) {
			if (bug.isOld() && bug.beyondCanvas()) {
				bugs[i] = makeBug(bug);
			}
			drawBug(bugs[i]);
		}
	}
}

function drawBug(bug) {
	bug.render(brush, true);

	if (Math.random() < 0.06) {
		bug.turn(Util.rndAmong(1, -1) * Math.PI / Util.rndAmong(3, 4, 5, 6));
	}
	bug.move();
}
