var x;

chrome.storage.local.get(/* String or Array */["user"], function (items) {
	x = JSON.stringify(items);
	console.log(items);
	console.log(x);
	$.get(chrome.extension.getURL('js/inject.js'),
		function (data) {
			var script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.innerHTML = data;
			document.getElementsByTagName("head")[0].appendChild(script);
			document.getElementsByTagName("body")[0].setAttribute("onLoad", 'injected_main(' + x + ');');
		}
	);
});

