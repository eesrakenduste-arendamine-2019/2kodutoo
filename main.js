/*jshint esversion:6*/

let categoryAdd = document.querySelector("#vehicle");
let categoryValue = document.querySelector("#vehicle-type");
let nimistu = document.querySelector("#nimistu");
let categoryTabs = document.querySelector("#vehicle-tabs");

let categorys = JSON.parse(localStorage.getItem("categorys"));
let vehicles = JSON.parse(localStorage.getItem("vehicles"));

if(categorys === null || categorys === undefined) { categorys = []; }
if(vehicles === null || vehicles === undefined) { vehicles = []; }

console.log(categorys);
console.log(vehicles);

if(categoryAdd !== null && categoryAdd !== undefined) {
	categoryAdd.addEventListener("click", function() {
		let categoryId = categoryValue.value.replace(/[^a-z0-9]/gi,'');
		// kontroll kas juba on olemas.
		CreateCategory(categoryId, categoryValue.value);
		AddToCategorys(categoryId, categoryValue.value);
	});
}

function CreateCategory(categoryId, categoryName) {
	let existingBlock = document.querySelector("#category-"+categoryId);
	if(existingBlock !== null && existingBlock !== undefined) {
		alert("Selline category on juba olemas!");
		return;
	}

	HideCategorys();

	// põhi kontainerid jms
	let categoryBlock = document.createElement("div");
	categoryBlock.classList.add("category");
	categoryBlock.classList.add("active");
	categoryBlock.id = "category-"+categoryId;
	let categoryLabel = document.createElement("span");
	categoryLabel.innerText = categoryName;
	let vehiclesContainer = document.createElement("div");
	vehiclesContainer.class = "vehicles";

	let vehiclesTable = document.createElement("table");
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
	let vehicleName = document.createElement("input");
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
	vehicleDesc.type = "date";
	let vehicleAdd = document.createElement("input");
	vehicleAdd.type = "button";
	vehicleAdd.value = "Lisa raamat";
	let br = document.createElement("br");
	categoryLabel.classList.add("active");

	// Raamatu lisamine
	vehicleAdd.addEventListener("click", function() {
		CreateVehicle(vehicleName.value, vehicleLk.value, vehicleDesc.value, vehicleTbody, vehicles.length);
		AddToVehicles(categoryId, vehicleName.value, vehicleLk.value, vehicleDesc.value);

		vehicleName.value = "";
		vehicleLk.value = "";
		vehicleDesc.value = "";
	});

	// categoryi ja selle tabi aktiveerimine
	categoryLabel.addEventListener("click", function() {
		HideCategorys();
		categoryBlock.classList.add("active");
		categoryLabel.classList.add("active");
	});

	let inputContainer = document.createElement("div");
	inputContainer.className = "vehicle-inputs-container";
	categoryTabs.appendChild(categoryLabel);
	inputContainer.appendChild(vehicleName);
	inputContainer.appendChild(vehicleLk);
	inputContainer.appendChild(vehicleDesc);
	inputContainer.appendChild(vehicleAdd);
	categoryBlock.appendChild(inputContainer);

	categoryBlock.appendChild(vehiclesContainer);
	nimistu.appendChild(categoryBlock);
}

function AddToVehicles(categoryId, vehicleTitle, vehiclePage, vehicleDescription) {
	let vehicle = {"category":categoryId, "name":vehicleTitle, "lk":vehiclePage, "description":vehicleDescription};
	vehicles.push(vehicle);
	localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function AddToCategorys(categoryId, categoryName) {
	let category = {"id":categoryId, "name":categoryName};
	categorys.push(category);
	localStorage.setItem("categorys", JSON.stringify(categorys));
}

function CreateVehicle(vehicleTitle, vehiclePage, vehicleDescription, tbody, vehicleIndex) {
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
		RenderVehicles();
	});
	let bRow = document.createElement("tr");
	bRow.className = "vehicle";
	bRow.appendChild(bNameContainer);
	bRow.appendChild(bLkContainer);
	bRow.appendChild(bDescContainer);
	bRow.appendChild(bBtnContainer);
	tbody.appendChild(bRow);
}

function RenderCategorys() {
	for(let i = 0, category; category = categorys[i]; i++) {
		CreateCategory(category.id, category.name);
	}
}

function DeleteAllVehicleDOMs() {
	let buuks = document.querySelectorAll(".vehicle");
	for(let i = 0, b; b = buuks[i]; i++) {
		b.parentElement.removeChild(b);
	}
}

function RenderVehicles() {
	DeleteAllVehicleDOMs();
	for(let i = 0, vehicle; vehicle = vehicles[i]; i++) {
		let tbodyElement = document.querySelector("#category-"+vehicle.category+" table tbody");
		CreateVehicle(vehicle.name, vehicle.lk, vehicle.description, tbodyElement, i);
	}
}

function HideCategorys() {
	let categorys = document.querySelectorAll(".category");
	for(let i = 0, category; category = categorys[i]; i++) {
		if(category.classList.contains("active")) {
			category.classList.remove("active");
		}
	}

	let tabs = document.querySelectorAll("#category-tabs span");
	for(let i = 0, tab; tab = tabs[i]; i++) {
		if(tab.classList.contains("active")) {
			tab.classList.remove("active");
		}
	}
}

(function() {
   RenderCategorys();
   RenderVehicles();
})();
