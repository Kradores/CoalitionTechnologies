function sendXhrRequest(url, type, data, onSuccessCallback, onErrorCallback) {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener("load", onSuccessCallback);
	xhr.addEventListener("error", onErrorCallback);
	xhr.open(type, url);
	xhr.send(data);
}
