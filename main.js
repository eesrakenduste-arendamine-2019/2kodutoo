/*jshint esversion:6*/

let vehicleAdd = document.querySelector("#vehicle");
let vehicleValue = document.querySelector("#vehicle-name");
let jarjehoidja = document.querySelector("#jarjehoidja");
let vehicleTabs = document.querySelector("#vehicle-tabs");

let vehicles = JSON.parse(localStorage.getItem("vehicles"));

if(vehicles === null || vehicles === undefined) { vehicles = []; }

console.log(vehicles);

if(vehicleAdd !== null && vehicleAdd !== undefined) {
	vehicleAdd.addEventListener("click", function() {
		let vehicleId = vehicleValue.value.replace(/[^a-z0-9]/gi,'');
		// kontroll kas juba on olemas.
		Createvehicle(vehicleId, vehicleValue.value);
		AddTovehicles(vehicleId, vehicleValue.value);
	});
}

function Createvehicle(vehicleId, vehicleName) {
	let existingBlock = document.querySelector("#vehicle-"+vehicleId);
	if(existingBlock !== null && existingBlock !== undefined) {
		alert("Selline vehicle on juba olemas!");
		return;
	}

	Hidevehicles();

	// põhi kontainerid jms
	let vehicleBlock = document.createElement("div");
	vehicleBlock.classList.add("vehicle");
	vehicleBlock.classList.add("active");
	vehicleBlock.id = "vehicle-"+vehicleId;
	let vehicleLabel = document.createElement("span");
	vehicleLabel.innerText = vehicleName;
	let vehiclesContainer = document.createElement("div");
	vehiclesContainer.class = "vehicles";

	let vehicleTable = document.createElement("table");
	let vehicleThead = document.createElement("thead");
	let vehicleTr = document.createElement("tr");
	let vehicleTh = document.createElement("th");
	vehicleTh.innerText = "Sõiduki nimi";
	vehicleTr.appendChild(vehicleTh);
	vehicleTh = document.createElement("th");
	vehicleTh.innerText = "Sõiduki numbrimärk";
	vehicleTr.appendChild(vehicleTh);
	vehicleTh = document.createElement("th");
	vehicleTh.innerText = "Parkimise lõpu kuupäev";
	vehicleTr.appendChild(vehicleTh);
	vehicleTh = document.createElement("th"); // btnite jaoks
	vehicleTr.appendChild(vehicleTh);
	vehicleThead.appendChild(vehicleTr);
	vehiclesTable.appendChild(vehicleThead);
	let vehicleTbody = document.createElement("tbody");
	vehiclesTable.appendChild(vehicleTbody);
	vehiclesContainer.appendChild(vehiclesTable);

	// Raamatu lisamise inputid.
	let vehiclesName = document.createElement("input");
	vehicleName.type = "text";
	vehicleName.className = "vehicle-title";
	vehicleName.placeholder = "Sõiduki nimi";
	let vehicleLk = document.createElement("input");
	vehicleLk.className = "vehicle-lk";
	vehicleLk.placeholder = "Sõiduki numbrimärk";
	vehicleLk.type = "text";
	let vehicleDesc = document.createElement("input");
	vehicleDesc.className = "vehicle-desc";
	vehicleDesc.placeholder = "Parkimise lõpu kuupäev";
	vehicleDesc.type = "text";
	let vehicleAdd = document.createElement("input");
	vehicleAdd.type = "button";
	vehicleAdd.value = "Lisa sõiduk";
	let br = document.createElement("br");
	vehicleLabel.classList.add("active");

	// Raamatu lisamine
	vehicleAdd.addEventListener("click", function() {
		Createvehicle(vehicleName.value, vehicleLk.value, vehicleDesc.value, vehicleTbody, vehicles.length);
		AddTovehicles(vehicleId, vehicleName.value, vehicleLk.value, vehicleDesc.value);

		vehicleName.value = "";
		vehicleLk.value = "";
		vehicleDesc.value = "";
	});

	// vehiclei ja selle tabi aktiveerimine
	vehicleLabel.addEventListener("click", function() {
		Hidevehicles();
		vehicleBlock.classList.add("active");
		vehicleLabel.classList.add("active");
	});

	let inputContainer = document.createElement("div");
	inputContainer.className = "vehicle-inputs-container";
	vehicleTabs.appendChild(vehicleLabel);
	inputContainer.appendChild(vehicleName);
	inputContainer.appendChild(vehicleLk);
	inputContainer.appendChild(vehicleDesc);
	inputContainer.appendChild(vehicleAdd);
	vehicleBlock.appendChild(inputContainer);

	vehicleBlock.appendChild(vehiclesContainer);
	jarjehoidja.appendChild(vehicleBlock);
}

function AddTovehicles(vehicleId, vehicleTitle, vehiclePage, vehicleDescription) {
	let vehicle = {"vehicle":vehicleId, "name":vehicleTitle, "lk":vehiclePage, "description":vehicleDescription};
	vehicles.push(vehicle);
	localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function AddTovehicles(vehicleId, vehicleName) {
	let vehicle = {"id":vehicleId, "name":vehicleName};
	vehicles.push(vehicle);
	localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function Createvehicle(vehicleTitle, vehiclePage, vehicleDescription, tbody, vehicleIndex) {
	let bNameContainer = document.createElement("td");
	let bName = document.createElement("input");
	bName.value = vehicleTitle;
	bName.id = "vehicle-name-"+vehicleIndex;
	bName.type = "text";
	bNameContainer.appendChild(bName);
	let bLkContainer = document.createElement("td");
	let bLk = document.createElement("input");
	bLk.value = vehiclePage;
	bLk.id = "vehicle-lk-"+vehicleIndex;
	bLk.type = "text";
	bLkContainer.appendChild(bLk);
	let bDescContainer = document.createElement("td");
	let bDesc = document.createElement("input");
	bDesc.value = vehicleDescription;
	bDesc.id = "vehicle-desc-"+vehicleIndex;
	bDesc.type = "text";
	bDescContainer.appendChild(bDesc);
	let bBtnContainer = document.createElement("td");
	let bEdit = document.createElement("input");
	bBtnContainer.appendChild(bEdit);
	bEdit.type = "button";
	bEdit.value = "✓";
	bEdit.addEventListener("click", function() {
		vehicles[vehicleIndex].name = bName.value;
		vehicles[vehicleIndex].lk = bLk.value;
		vehicles[vehicleIndex].description = bDesc.value;
		localStorage.setItem("vehicles", JSON.stringify(vehicles));
	});
	let bDelete = document.createElement("input");
	bBtnContainer.appendChild(bDelete);
	bDelete.type = "button";
	bDelete.value = "X";
	bDelete.addEventListener("click", function() {
		vehicles.splice(vehicleIndex, 1);
		localStorage.setItem("vehicles", JSON.stringify(vehicles));
		Rendervehicles();
	});
	let bRow = document.createElement("tr");
	bRow.className = "vehicle";
	bRow.appendChild(bNameContainer);
	bRow.appendChild(bLkContainer);
	bRow.appendChild(bDescContainer);
	bRow.appendChild(bBtnContainer);
	tbody.appendChild(bRow);
}

function Rendervehicles() {
	for(let i = 0, vehicle; vehicle = vehicles[i]; i++) {
		Createvehicle(vehicle.id, vehicle.name);
	}
}

function DeleteAllvehicleDOMs() {
	let buuks = document.querySelectorAll(".vehicle");
	for(let i = 0, b; b = buuks[i]; i++) {
		b.parentElement.removeChild(b);
	}
}

function Rendervehicles() {
	DeleteAllvehicleDOMs();
	for(let i = 0, vehicle; vehicle = vehicles[i]; i++) {
		let tbodyElement = document.querySelector("#vehicle-"+vehicle.vehicle+" table tbody");
		Createvehicle(vehicle.name, vehicle.lk, vehicle.description, tbodyElement, i);
	}
}

function Hidevehicles() {
	let vehicles = document.querySelectorAll(".vehicle");
	for(let i = 0, vehicle; vehicle = vehicles[i]; i++) {
		if(vehicle.classList.contains("active")) {
			vehicle.classList.remove("active");
		}
	}

	let tabs = document.querySelectorAll("#vehicle-tabs span");
	for(let i = 0, tab; tab = tabs[i]; i++) {
		if(tab.classList.contains("active")) {
			tab.classList.remove("active");
		}
	}
}

(function() {
   Rendervehicles();
   Rendervehicles();
})();
