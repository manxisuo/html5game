// require: Util (util.js)
function Bug(config) {
	this.brush = brush;
	Util.merge(this, {
		x: 0,
		y: 0,
		angle: 0,
		dx: 5,
		dy: 5,
		width: 50,
		height: 50,
		image: null,
		countdown: Util.rndRange(10, 20),
		killed: false,
	});
	Util.merge(this, config);
}

Bug.prototype.move = function() {
	this.x += this.dx;
	this.y += this.dy;

	this.countdown--;
};

Bug.prototype.isOld = function() {
	return this.countdown <= 0;
};

Bug.prototype.markKilled = function() {
	this.killed = true;
};

Bug.prototype.isKilled = function() {
	return this.killed;
};

Bug.prototype.beyondCanvas = function() {
	var canvasW = this.brush.canvas.width;
	var canvasH = this.brush.canvas.height;

	if (this.x + this.width / 2 <= 0 || this.x - this.width / 2 >= canvasW) { return true; }

	if (this.y + this.height / 2 <= 0 || this.y - this.height / 2 >= canvasH) { return true; }

	return false;
};

Bug.prototype.render = function(brush, autoTurn) {
	if (autoTurn) {
		brush.image(this.image, this.x, this.y, this.width, this.height, this.getMoveAngle());
	}
	else {
		brush.image(this.image, this.x, this.y, this.width, this.height, this.angle);
	}

	// brush.circle(this.x, this.y, this.width/2).fill();
	// brush.strokeText('Bug', this.x, this.y);
	// brush.fillStyle(Util.rndRGB());
	// brush.rect(this.x, this.y, this.width, this.height).fill();
};

Bug.prototype.turn = function(angle) {
	var dr = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
	var curAngle = this.getMoveAngle() + angle;
	this.dx = dr * Math.cos(curAngle);
	this.dy = dr * Math.sin(curAngle);
};

Bug.prototype.getDirection = function() {
	return this.dy / this.dx;
};

Bug.prototype.getMoveAngle = function() {
	return Util.getAngle(this.dx, this.dy);
};

Bug.prototype.rotate = function(angle) {
	return this.angle += angle;
};

Bug.STATUS = {
	NORMAL: 0,
	DEAD: -1,
};
