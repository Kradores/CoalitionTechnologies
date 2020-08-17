function fillTable(response) {
	const tableBody = document.querySelector("TBODY");
	const totalValueElement = document.querySelector("TFOOT").querySelector("th.total-value");
	if (response.message) {
		return;
	}

	totalValueElement.innerText = 0;
	for (const id in response.data) {
		totalValueElement.innerText =
			(
				+totalValueElement.innerText.replace(" $", "") +
				response.data[id].quantity * response.data[id].unit_price
			).toFixed(2) + " $";
		insertOrUpdate(id, response.data[id], tableBody);
	}
	deleteRowsIfRequired(response.data, tableBody);
}

function fillRow(id, data, editable = false) {
	const row = document.createElement("TR");

	row.setAttribute("id", id);
	row.appendChild(prepareCell(data.name, editable));
	row.appendChild(prepareCell(data.quantity, editable));
	row.appendChild(prepareCell((+data.unit_price).toFixed(2) + " $", editable));
	row.appendChild(prepareCell(data.submitted));
	row.appendChild(prepareCell((data.quantity * data.unit_price).toFixed(2) + " $"));

	if (editable) {
		row.addEventListener("focusout", saveRow, false, (useCapture = true));
	}

	return row;
}

function prepareCell(text, editable = false) {
	const cell = document.createElement("TD");
	cell.innerText = text;
	if (editable) {
		cell.setAttribute("contenteditable", true);
		cell.addEventListener("focus", setLastValue);
		cell.addEventListener("focusout", null, false, { capture: true });
	}
	return cell;
}

function insertOrUpdate(id, data, tableBody) {
	if (!insert(id, data, tableBody)) {
		update(id, data, tableBody);
	}
}

function deleteRowsIfRequired(data, tableBody) {
	for (const row of tableBody.children) {
		if (!data[row.id]) {
			row.parentNode.removeChild(row);
		}
	}
}

function update(id, data, tableBody) {
	const currentRow = tableBody.querySelector('tr[id="' + id + '"]');
	const newRow = fillRow(id, data, true);
	if (currentRow.children[3].innerText != data.submitted) {
		tableBody.removeChild(currentRow);
		for (const row of tableBody.children) {
			if (row.children[3].innerText <= data.submitted) {
				tableBody.insertBefore(newRow, row);
				break;
			}
		}
	}

	if (!currentRow) {
		tableBody.appendChild(newRow);
	}
}

function insert(id, data, tableBody) {
	const currentRow = tableBody.querySelector('tr[id="' + id + '"]');
	const newRow = fillRow(id, data, true);
	let inserted = false;

	for (const row of tableBody.children) {
		if (row.children[3].innerText <= data.submitted && !currentRow) {
			tableBody.insertBefore(newRow, row);
			inserted = true;
			break;
		}
	}
	if (!inserted && !currentRow) {
		tableBody.appendChild(newRow);
		inserted = true;
	}

	return inserted;
}

function setLastValue() {
	this.lastValue = this.innerText;
}
