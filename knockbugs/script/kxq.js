var ctx;
var canvas;

var INTERVAL = 50;
var WIDTH;
var HEIGHT;

// 全局数据
var bg_img;
var bg_pattern;
var bg_gradient;
var image;
var brush;
var gameCount = 0;

// 每次游戏(关卡)的数据
var bugs = [];
var bug_total = 0;
var currentCount = bug_total;
var timerId;
var startTime; // 本关卡开始时间

function makeBug() {
	var x, y;
	var type = Util.rndAmong(true, false);

	if (type) {
		x = Util.rndAmong(0, WIDTH);
		y = Util.rndRange(0, HEIGHT);
	} else {
		x = Util.rndRange(0, WIDTH);
		y = Util.rndAmong(0, HEIGHT);
	}

	var angle = Util.getAngle(WIDTH / 2 - x, HEIGHT / 2 - y);
	var dr = 10;
	var dx = dr * Math.cos(angle);
	var dy = dr * Math.sin(angle);

	return new Bug({
		x : x,
		y : y,
		dx : dx,
		dy : dy,
		image : image,
	});
}

// 全局初始化
function init() {
	canvas = $('#canvas')[0];
	ctx = $('#canvas')[0].getContext('2d');
	WIDTH = canvas.width = window.screen.availWidth;
	HEIGHT = canvas.height = window.screen.availHeight;
	// WIDTH = canvas.width = document.body.clientWidth;
	// HEIGHT = canvas.height = document.body.clientHeight;

	image = $('#image_source')[0];
	bg_img = $('#bg_img')[0];
	bg_pattern = ctx.createPattern(bg_img, 'repeat');
	bg_gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
	bg_gradient.addColorStop(0, 'rgb(0, 137, 40)');
	bg_gradient.addColorStop(1, 'rgb(0, 137, 143)');

	PopWin.init();

	brush = new Brush(canvas.getContext('2d'));

	// 监听器
	canvas.addEventListener('touchstart', checkKnock);

	drawWelcomePage();
}

function checkKnock(e) {
	e.preventDefault();

	var touch = e.targetTouches[0];
	var knockedBugs = searchKnockedBug(touch.pageX - canvas.offsetLeft,
			touch.pageY - canvas.offsetTop);

	currentCount -= knockedBugs.length;

	if (knockedBugs.length > 0) {
		knockedBugs.forEach(function(bug) {
			bug.markKilled();
		});
	}
}

function searchKnockedBug(x, y) {
	var results = [];
	var bug;

	for ( var i = 0; i < bugs.length; i++) {
		bug = bugs[i];

		if (!bug.isKilled() & Math.abs(x - bug.x) <= bug.width / 2 + 20
				&& Math.abs(y - bug.y) <= bug.height / 2 + 20) {
			results.push(bug);
		}
	}

	return results;
}

// 新游戏初始化
function newGame() {
	gameCount++;
	bug_total = gameCount * 2;
	currentCount = bug_total;

	bugs = [];
	for ( var i = 0; i < bug_total; i++) {
		bugs.push(makeBug());
	}

	// 周期任务
	timerId = setInterval(draw, INTERVAL);

	startTime = new Date().getTime();
}

// 结束游戏时清理数据
function endGame() {
	gameCount = 0;
}

function draw() {
	drawBackground();

	var bug;
	for ( var i = 0; i < bugs.length; i++) {
		bug = bugs[i];
		if (!bug.isKilled()) {
			if (bug.isOld() && bug.beyondCanvas()) {
				bugs[i] = makeBug();
			}
			drawBug(bugs[i]);
		}
	}

	if (currentCount <= 0) {
		clearInterval(timerId);

		var time = Math.floor((new Date().getTime() - startTime) / 1000);

		var tip = '恭喜你, 已全部消灭(共' + bug_total + '个)! 耗时' + time + '秒. 继续下一关?';

		PopWin.show(tip, function() {
			newGame();
		}, function() {
			endGame();
			drawWelcomePage();
		});
	}
}

function drawBackground() {
	// brush.clear(bg_pattern);
	// brush.clear(bg_gradient);
	brush.clear();
}

function drawBug(bug) {
	bug.render(brush);

	if (Math.random() < 0.1) {
		bug.turn(Util.rndAmong(1, -1) * Math.PI / Util.rndAmong(3, 4, 6));
	}
	bug.move();
}

function drawWelcomePage() {
	var angle = 0;
	var timerId = setInterval(function() {
		angle += Math.PI / 12;
		drawBackground();
		brush.fillText('一起打小强', WIDTH / 2 - 125, 100, '50px sans-serif');
		brush.image(image, WIDTH / 2, HEIGHT / 2, 200, 200, -Math.PI / 2
				+ angle);
	}, 50);

	var fn = function() {
		clearInterval(timerId);
		canvas.removeEventListener('touchstart', fn);
		newGame();
	};
	canvas.addEventListener('touchstart', fn);

}
