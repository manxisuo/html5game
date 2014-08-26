(function(window) {
	var PopWin = {};

	var win, msgField, okBtn, cancelBtn, mask;

	PopWin.init = function() {
		win = $('<div />').addClass('popwin-win');
		win.width(300).height(150);
		msgField = $('<div />').addClass('popwin-message');
		okBtn = $('<button />').addClass('popwin-yes').text('Yes');
		cancelBtn = $('<button />').addClass('popwin-no').text('No');

		win.append(msgField).append(okBtn).append(cancelBtn);

		mask = $('<div />').addClass('popwin-mask');

		$(document.body).append(mask).append(win);
	};

	PopWin.show = function(message, whenYes, whenNo) {
		var me = this;

		var left = (window.screen.availWidth - win.width()) / 2;
		var top = (window.screen.availHeight - win.height()) / 2;
		// win.offset({
		// left : left,
		// top : top
		// });
		win.css({
			left : left + 'px',
			top : top + 'px',
		});

		mask.width(window.screen.availWidth).height(window.screen.availHeight);

		msgField.text(message);

		okBtn.unbind('click').on('click', function() {
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

		win.show();
		mask.show();
	};

	PopWin.hide = function() {
		win.hide();
		mask.hide();
	};

	window.PopWin = PopWin;
})(window);
