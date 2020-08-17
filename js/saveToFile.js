const formElement = document.getElementsByTagName("FORM")[0];
const formElementSubmit = formElement.querySelector('input[type="submit"]');
formElementSubmit.addEventListener("click", saveDataToFile);

function saveDataToFile(event) {
	event.preventDefault();
	if (validateForm(formElement)) {
		formElementSubmit.removeEventListener("click", saveDataToFile);
		sendXhrRequest(
			formElement.action,
			formElement.method,
			new FormData(formElement),
			onSaveSuccess,
			onSaveError
		);
	}
}

function saveRow(event) {
	if (event.target.innerText == event.target.lastValue) {
		return;
	}
	if (validateRow(this)) {
		const formData = new FormData();
		formData.append("id", this.id);
		formData.append("name", this.children[0].innerText);
		formData.append("quantity", this.children[1].innerText);
		formData.append("unit_price", this.children[2].innerText.replace(" $", ""));

		sendXhrRequest(
			window.location.href + "php/saveToJson.php",
			"POST",
			formData,
			onSaveSuccess,
			onSaveError
		);
	}
}

function onSaveSuccess() {
	console.log(this.responseText);
	const response = JSON.parse(this.responseText);
	formElementSubmit.addEventListener("click", saveDataToFile);
}

function onSaveError() {
	const response = JSON.parse(this.responseText);
	formElementSubmit.addEventListener("click", saveDataToFile);
	console.error(this);
}
