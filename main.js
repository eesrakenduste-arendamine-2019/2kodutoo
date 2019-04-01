/*jshint esversion:6*/

let zanrAdd = document.querySelector("#zanr");
let zanrValue = document.querySelector("#zanr-name");
let jarjehoidja = document.querySelector("#jarjehoidja");
let zanrTabs = document.querySelector("#zanr-tabs");

let zanrs = JSON.parse(localStorage.getItem("zanrs"));
let books = JSON.parse(localStorage.getItem("books"));

if(zanrs === null || zanrs === undefined) { zanrs = []; }
if(books === null || books === undefined) { books = []; }

console.log(zanrs);
console.log(books);

if(zanrAdd !== null && zanrAdd !== undefined) {
	zanrAdd.addEventListener("click", function() {
		let zanrId = zanrValue.value.replace(/[^a-z0-9]/gi,'');
		// kontroll kas juba on olemas.
		CreateZanr(zanrId, zanrValue.value);
		AddToZanrs(zanrId, zanrValue.value);
	});
}

function CreateZanr(zanrId, zanrName) {
	let existingBlock = document.querySelector("#zanr-"+zanrId);
	if(existingBlock !== null && existingBlock !== undefined) {
		alert("Selline zanr on juba olemas!");
		return;
	}

	HideZanrs();

	// põhi kontainerid jms
	let zanrBlock = document.createElement("div");
	zanrBlock.classList.add("zanr");
	zanrBlock.classList.add("active");
	zanrBlock.id = "zanr-"+zanrId;
	let zanrLabel = document.createElement("span");
	zanrLabel.innerText = zanrName;
	let booksContainer = document.createElement("div");
	booksContainer.class = "books";

	let booksTable = document.createElement("table");
	let bookThead = document.createElement("thead");
	let bookTr = document.createElement("tr");
	let bookTh = document.createElement("th");
	bookTh.innerText = "Raamatu nimi";
	bookTr.appendChild(bookTh);
	bookTh = document.createElement("th");
	bookTh.innerText = "Lehekülg";
	bookTr.appendChild(bookTh);
	bookTh = document.createElement("th");
	bookTh.innerText = "Lühikirjeldus";
	bookTr.appendChild(bookTh);
	bookTh = document.createElement("th"); // btnite jaoks
	bookTr.appendChild(bookTh);
	bookThead.appendChild(bookTr);
	booksTable.appendChild(bookThead);
	let bookTbody = document.createElement("tbody");
	booksTable.appendChild(bookTbody);
	booksContainer.appendChild(booksTable);

	// Raamatu lisamise inputid.
	let bookName = document.createElement("input");
	bookName.type = "text";
	bookName.className = "book-title";
	bookName.placeholder = "Raamatu nimi";
	let bookLk = document.createElement("input");
	bookLk.className = "book-lk";
	bookLk.placeholder = "Leheküljed";
	bookLk.type = "text";
	let bookDesc = document.createElement("input");
	bookDesc.className = "book-desc";
	bookDesc.placeholder = "Lühikirjeldus";
	bookDesc.type = "text";
	let bookAdd = document.createElement("input");
	bookAdd.type = "button";
	bookAdd.value = "Lisa raamat";
	let br = document.createElement("br");
	zanrLabel.classList.add("active");

	// Raamatu lisamine
	bookAdd.addEventListener("click", function() {
		CreateBook(bookName.value, bookLk.value, bookDesc.value, bookTbody, books.length);
		AddToBooks(zanrId, bookName.value, bookLk.value, bookDesc.value);

		bookName.value = "";
		bookLk.value = "";
		bookDesc.value = "";
	});

	// Zanri ja selle tabi aktiveerimine
	zanrLabel.addEventListener("click", function() {
		HideZanrs();
		zanrBlock.classList.add("active");
		zanrLabel.classList.add("active");
	});

	let inputContainer = document.createElement("div");
	inputContainer.className = "book-inputs-container";
	zanrTabs.appendChild(zanrLabel);
	inputContainer.appendChild(bookName);
	inputContainer.appendChild(bookLk);
	inputContainer.appendChild(bookDesc);
	inputContainer.appendChild(bookAdd);
	zanrBlock.appendChild(inputContainer);

	zanrBlock.appendChild(booksContainer);
	jarjehoidja.appendChild(zanrBlock);
}

function AddToBooks(zanrId, bookTitle, bookPage, bookDescription) {
	let book = {"zanr":zanrId, "name":bookTitle, "lk":bookPage, "description":bookDescription};
	books.push(book);
	localStorage.setItem("books", JSON.stringify(books));
}

function AddToZanrs(zanrId, zanrName) {
	let zanr = {"id":zanrId, "name":zanrName};
	zanrs.push(zanr);
	localStorage.setItem("zanrs", JSON.stringify(zanrs));
}

function CreateBook(bookTitle, bookPage, bookDescription, tbody, bookIndex) {
	let bNameContainer = document.createElement("td");
	let bName = document.createElement("input");
	bName.value = bookTitle;
	bName.id = "book-name-"+bookIndex;
	bName.type = "text";
	bNameContainer.appendChild(bName);
	let bLkContainer = document.createElement("td");
	let bLk = document.createElement("input");
	bLk.value = bookPage;
	bLk.id = "book-lk-"+bookIndex;
	bLk.type = "text";
	bLkContainer.appendChild(bLk);
	let bDescContainer = document.createElement("td");
	let bDesc = document.createElement("input");
	bDesc.value = bookDescription;
	bDesc.id = "book-desc-"+bookIndex;
	bDesc.type = "text";
	bDescContainer.appendChild(bDesc);
	let bBtnContainer = document.createElement("td");
	let bEdit = document.createElement("input");
	bBtnContainer.appendChild(bEdit);
	bEdit.type = "button";
	bEdit.value = "✓";
	bEdit.addEventListener("click", function() {
		books[bookIndex].name = bName.value;
		books[bookIndex].lk = bLk.value;
		books[bookIndex].description = bDesc.value;
		localStorage.setItem("books", JSON.stringify(books));
	});
	let bDelete = document.createElement("input");
	bBtnContainer.appendChild(bDelete);
	bDelete.type = "button";
	bDelete.value = "X";
	bDelete.addEventListener("click", function() {
		books.splice(bookIndex, 1);
		localStorage.setItem("books", JSON.stringify(books));
		RenderBooks();
	});
	let bRow = document.createElement("tr");
	bRow.className = "book";
	bRow.appendChild(bNameContainer);
	bRow.appendChild(bLkContainer);
	bRow.appendChild(bDescContainer);
	bRow.appendChild(bBtnContainer);
	tbody.appendChild(bRow);
}

function RenderZanrs() {
	for(let i = 0, zanr; zanr = zanrs[i]; i++) {
		CreateZanr(zanr.id, zanr.name);
	}
}

function DeleteAllBookDOMs() {
	let buuks = document.querySelectorAll(".book");
	for(let i = 0, b; b = buuks[i]; i++) {
		b.parentElement.removeChild(b);
	}
}

function RenderBooks() {
	DeleteAllBookDOMs();
	for(let i = 0, book; book = books[i]; i++) {
		let tbodyElement = document.querySelector("#zanr-"+book.zanr+" table tbody");
		CreateBook(book.name, book.lk, book.description, tbodyElement, i);
	}
}

function HideZanrs() {
	let zanrs = document.querySelectorAll(".zanr");
	for(let i = 0, zanr; zanr = zanrs[i]; i++) {
		if(zanr.classList.contains("active")) {
			zanr.classList.remove("active");
		}
	}

	let tabs = document.querySelectorAll("#zanr-tabs span");
	for(let i = 0, tab; tab = tabs[i]; i++) {
		if(tab.classList.contains("active")) {
			tab.classList.remove("active");
		}
	}
}

(function() {
   RenderZanrs();
   RenderBooks();
})();
