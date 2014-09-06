(function(window) {
	var PopWin = {};

	var win, header, msgField, yesBtn, noBtn, okBtn, mask;
	var yesCallback, noCallback, okCallback;

	// 获取可视区域的高度.
	// 在Nexus 7微信内置浏览器中测试发现, 用$(window).height()得到的值是0.
	function getWindowHeight() {
		var h = $(window).height();
		if (h == 0) {
			h = window.innerHeight;
		}

		return h;
	}

	PopWin.init = function(renderTo) {
		var me = this;
		
		win = $('<div />').addClass('popwin-win');
		win.width(300).height(200);

		header = $('<div />').addClass('popwin-header');
		msgField = $('<div />').addClass('popwin-message');
		yesBtn = $('<button />').addClass('popwin-yes').text('Yes');
		noBtn = $('<button />').addClass('popwin-no').text('No');
		okBtn = $('<button />').addClass('popwin-ok').text('OK');

		win.append(header).append($('<hr />'));
		win.append(msgField).append($('<hr />'));
		win.append(yesBtn).append(noBtn).append(okBtn);

		mask = $('<div />').addClass('popwin-mask');

		if (!renderTo) {
			renderTo = $(document.body)
		}
		renderTo.append(mask).append(win);

		okBtn.unbind('tap').on('tap', function() {
			me.hide();
			if (okCallback) {
				okCallback();
			}
		});

		yesBtn.unbind('tap').on('tap', function() {
			me.hide();
			if (yesCallback) {
				yesCallback();
			}
		});

		noBtn.unbind('tap').on('tap', function() {
			me.hide();
			if (noCallback) {
				noCallback();
			}
		});
	};

	PopWin.alert = function(title, message, callback) {
		var me = this;

		var left = ($(window).width() - win.width()) / 2;
		var top = (getWindowHeight() - win.height()) / 2;

		win.css({
			left: left + 'px',
			top: top + 'px',
		});

		mask.width(window.screen.availWidth).height(window.screen.availHeight);

		header.text(title);
		msgField.html(message);

		okCallback = callback;
		
		yesBtn.hide();
		noBtn.hide();
		okBtn.show();
		win.show();
		mask.show();
	};

	PopWin.confirm = function(title, message, whenYes, whenNo) {
		var me = this;

		var left = ($(window).width() - win.width()) / 2;
		var top = (getWindowHeight() - win.height()) / 2;
		win.css({
			left: left + 'px',
			top: top + 'px',
		});

		mask.width(window.screen.availWidth).height(window.screen.availHeight);

		header.text(title);
		msgField.html(message);

		yesCallback = whenYes;
		noCallback = whenNo;
		
		okBtn.hide();
		yesBtn.show();
		noBtn.show();
		win.show();
		mask.show();
	};

	PopWin.hide = function() {
		win.hide();
		mask.hide();
	};

	window.PopWin = PopWin;
})(window);
