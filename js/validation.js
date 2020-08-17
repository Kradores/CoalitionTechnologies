function validateForm(formElement) {
	for (const input of formElement.querySelectorAll("INPUT")) {
		switch (input.getAttribute("type")) {
			case "digits":
				if (!validateDigits(input.value)) {
					setFormInputError(input);
					return false;
				}
				break;

			case "float":
				if (!validateFloat(input.value)) {
					setFormInputError(input);
					return false;
				}
				break;

			case "text":
				if (!validateText(input.value)) {
					setFormInputError(input);
					return false;
				}
				break;
		}
	}
	return true;
}

function validateRow(rowElement) {
	setTimeout(removeElementError, 1000, rowElement);
	if (!validateText(rowElement.children[0].innerText)) {
		setElementError(rowElement);
		resetCellData(rowElement.children[0]);
		return false;
	}

	if (!validateDigits(rowElement.children[1].innerText)) {
		setElementError(rowElement);
		resetCellData(rowElement.children[1]);
		return false;
	}

	if (!validateFloat(rowElement.children[2].innerText.replace(" $", ""))) {
		setElementError(rowElement);
		resetCellData(rowElement.children[2]);
		return false;
	}

	return true;
}

function validateText(value) {
	if (value.length < 3 || value.length > 255) {
		return false;
	}
	return true;
}

function validateDigits(value) {
	if (value < 1 || value > 100000) {
		return false;
	}

	return Number(value) == value && value % 1 === 0;
}
function validateFloat(value) {
	if (value < 0.01 || value > 100000) {
		return false;
	}
	return Number(value) == value;
}

(function initFormValidation() {
	const formInputs = document.querySelectorAll("FORM INPUT");
	for (const input of formInputs) {
		if (input.getAttribute("type") != "submit" && input.getAttribute("type") != "reset") {
			input.addEventListener("focus", removeError);
		}
	}
})();

function removeError() {
	this.parentElement.parentElement.classList.remove("error");
}

function setFormInputError(input) {
	input.parentElement.parentElement.classList.add("error");
}

function removeElementError(element) {
	element.classList.remove("error");
}

function setElementError(element) {
	element.classList.add("error");
}

function resetCellData(element) {
	element.innerText = element.lastValue;
}
