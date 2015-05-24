

function foo(callback) {
	chrome.tabs.executeScript({
	    file: 'test.js'
	});
}


chrome.browserAction.onClicked.addListener(function(tab) {
	foo();
});
