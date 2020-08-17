var response;
(function initTable() {
	sendXhrRequest(
		window.location.href + "php/loadFromJson.php?type=all",
		"GET",
		null,
		onLoadSuccess,
		onLoadError
	);
})();

setInterval(loadTable, 1000);

function loadTable() {
	var url = window.location.href + "php/loadFromJson.php?type=all";
	if (response.last_modified) {
		url =
			window.location.href +
			"php/loadFromJson.php?type=modified&last_modified=" +
			response.last_modified;
	}
	sendXhrRequest(url, "GET", null, onLoadSuccess, onLoadError);
}

function onLoadSuccess() {
	response = JSON.parse(this.responseText);
	fillTable(response);
}

function onLoadError() {
	response = JSON.parse(this.responseText);
	console.error(this);
}
