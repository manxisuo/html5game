(function(window) {
	var PopWin = {};

	var win, header, msgField, yesBtn, cancelBtn, okBtn, mask;

	PopWin.init = function(renderTo) {
		win = $('<div />').addClass('popwin-win');
		win.width(300).height(200);

		header = $('<div />').addClass('popwin-header');
		msgField = $('<div />').addClass('popwin-message');
		yesBtn = $('<button />').addClass('popwin-yes').text('Yes');
		cancelBtn = $('<button />').addClass('popwin-no').text('No');
		okBtn = $('<button />').addClass('popwin-ok').text('OK');

		win.append(header).append($('<hr />'));
		win.append(msgField).append($('<hr />'));
		win.append(yesBtn).append(cancelBtn).append(okBtn);

		mask = $('<div />').addClass('popwin-mask');

		if (!renderTo) {
			renderTo = $(document.body)
		}
		renderTo.append(mask).append(win);
	};

	PopWin.alert = function(title, message, callback) {
		var me = this;

		// var left = (window.screen.availWidth - win.width()) / 2;
		// var top = (window.screen.availHeight - win.height()) / 2;
		var left = ($(window).width() - win.width()) / 2;
		var top = ($(window).height() - win.height()) / 2;

		win.css({
			left: left + 'px',
			top: top + 'px',
		});

		mask.width(window.screen.availWidth).height(window.screen.availHeight);

		header.text(title);
		msgField.html(message);

		okBtn.unbind('tap').on('tap', function() {
			me.hide();
			if (callback) {
				callback();
			}
		});

		yesBtn.hide();
		cancelBtn.hide();
		okBtn.show();
		win.show();
		mask.show();
	};

	PopWin.confirm = function(title, message, whenYes, whenNo) {
		var me = this;

		// var left = (window.screen.availWidth - win.width()) / 2;
		// var top = (window.screen.availHeight - win.height()) / 2;
		var left = ($(window).width() - win.width()) / 2;
		var top = ($(window).height() - win.height()) / 2;
		win.css({
			left: left + 'px',
			top: top + 'px',
		});

		mask.width(window.screen.availWidth).height(window.screen.availHeight);

		header.text(title);
		msgField.html(message);

		yesBtn.unbind('click').on('click', function() {
			me.hide();
			if (whenYes) {
				whenYes();
			}
		});

		cancelBtn.unbind('click').on('click', function() {
			me.hide();
			if (whenNo) {
				whenNo();
			}
		});

		okBtn.hide();
		yesBtn.show();
		cancelBtn.show();
		win.show();
		mask.show();
	};

	PopWin.hide = function() {
		win.hide();
		mask.hide();
	};

	window.PopWin = PopWin;
})(window);
