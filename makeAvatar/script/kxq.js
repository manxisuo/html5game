var INTERVAL = 500;
var manager;

var canvas1;
var canvas2;

var brush1;
var brush2;

var size1;
var size2;

$(function() {
	main();
});

// 全局初始化
function main() {
	init();

	dosth();
}

function ajustSize() {
	var screenW = window.screen.availWidth;
	var screenH = window.screen.availHeight;
	if (screenH >= screenW) {
		size2 = screenW - 100;
	}
	else {
		size2 = screenH - 150;
	}
	size2 = Util.min(size1, size2);
	canvas2.width = canvas2.height = size2;

	size1 = canvas1.width;
}

function init() {
	PopWin.init();

	canvas1 = $('#canvas1')[0];
	canvas2 = $('#canvas2')[0];

	ajustSize();

	// 得到画笔
	brush1 = new Brush(canvas1.getContext('2d'));
	brush2 = new Brush(canvas2.getContext('2d'));

	// 打开图片文件
	$('#openFileBtn').on('click', function() {
		$('#image').attr('src', '');
		$('#file').remove();
		$('#fileSpan').append($('<input type="file" accept="image/*" id="file" />'));

		$('#file').on('change', onFileSelect);
		$('#file').click();
	});

	function onFileSelect(e) {
		var file = e.target.files[0];

		var reader = new FileReader();

		var img = $('#image')[0];

		reader.onload = function(e) {
			img.src = e.target.result;
		};

		reader.readAsDataURL(file);

		img.onload = function() {
			brush1.clear();
			brush1.image(img, size1 / 2, size1 / 2, size1, size1);

			brush2.clear();
			brush2.sliceImage(canvas1, 0, 0, size1, size1, 0, 0, size2, size2);
		};
	}

	// 生成最终图片
	$('#executeBtn').on('click', function() {
		var icon = $('#icon')[0];

		brush1.image(icon, 368, 75, 150, 150);

		brush2.clear();
		brush2.sliceImage(canvas1, 0, 0, size1, size1, 0, 0, size2, size2);
	});

	// 导出图片
	$('#exportBtn').on('click', function() {
		var imgUrl = canvas1.toDataURL();

		PopWin.alert('长按下面的图片保存:',  $('<img />').width(50).height(50).attr('src', imgUrl));

		// $('#exportLink').attr('href', imgUrl).show();
	});

	// $('#exportLink').on('click', function(){
	// $(this).hide();
	// });
}

function dosth() {
}
