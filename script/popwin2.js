(function(window) {
	var PopWin = {};
	var pageId;
	var popLinkId;

	var headerContent;
	var msgContent;
	var closeBtn;
	var closeCallback;

	PopWin.init = function(mainPage) {
		var tmp = new Date().getTime();
		pageId = 'popwin_' + tmp;
		popLinkId = 'poplink_' + tmp;

		// 弹窗
		var page = $('<div data-role="page" />').attr('id', pageId);

		var header = $('<div data-role="header" />');
		headerContent = $('<h1 />').appendTo(header);

		var contentBody = $('<div data-role="content" />');
		msgContent = $('<p />');
		closeBtn = $('<a href="#pageone" data-role="button" />').text('关闭');
		contentBody.append(msgContent).append(closeBtn);

		page.append(header).append(contentBody);

		$(document.body).append(page);

		// 链接
		var popLink = $('<a data-rel="dialog" />');
		popLink.attr('id', popLinkId).attr('href', '#' + pageId);
		mainPage.children('div').append(popLink);

		// 事件
		$(document).on("pagehide", '#' + pageId, function() {
			if (closeCallback) {
				closeCallback();
			}
		});
	};

	PopWin.alert = function(title, message, callback) {
		headerContent.text(title);
		msgContent.text(message);
		closeCallback = callback;
		$('#' + popLinkId).click();
	};

	PopWin.confirm = function(title, message, whenYes, whenNo) {
	};

	PopWin.hide = function() {
	};

	window.PopWin2 = PopWin;
})(window);
