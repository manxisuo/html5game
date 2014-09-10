/**
 * 使用jquery mobile实现的弹窗。 
 * 虽然看起来是弹窗形式，但是实际上类似于发生了页面跳转，所以当关闭该弹窗时，
 * 父页面会刷新，所以跟通常的弹窗不一样。使用时要注意。 
 * 
 * TODO 后续研究一下怎样能够避免父页面刷新。
 * 
 * 注意：要在页面pagecreate事件的处理器中调用PopWin2.init()，即
 * $(document).on('pagecreate', function() {
 *     PopWin2.init();
 * })
 */

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
