/**
 * handles logic concerning the class of Book
 */
class Book {
	constructor(name, series, id, src, snum, creds, picsrc) {
		this.name = name;
		this.series = series;
		this.id = id;
		this.src = src;
		this.snum = snum;
		this.credit = creds;
		this.picsrc = picsrc;
	}
	
	get createHtml() {
		let str = "<div class = \"bookBackground\">\n" +
			"<img alt=\"Cool Image\" src=\"";
		str += this.picsrc;
		str += "\">\n" +
			"<div class = \"bookInfoWrapWrap\">\n" +
			"<div class = \"bookInfoWrap\">\n" +
			"<a class = \"bookTitle\" href = \"";
		str += this.src;
		str += "\">";
		str += this.name;
		str += "</a>\n" +
			"<p class = \"author\">by ";
		str += this.credit;
		str += "</p>\n" + 
			"<p class = \"bookBottom\">";
		if (this.series != null) {
			str += this.series + " #" + this.snum;
		} else {
			str += "Standalone Book";
		}
		str += "</p>\n" +
			"</div>\n" +
			"</div>\n" +
			"</div>";
		return str;
	}
}

const placeholder = new Book("Placeholder", 
	"The Unknown series",
	"placeholder:unknown#1",
	"placeholder.html",
	1,
	"Sully",
	"../pics/Placeholder.jpg"
);

const paperweightperil = new Book(
	"The Paperweight Peril",
	"The Unknown series",
	"thepaperweightperil:unknown#2",
	"paperweight.html",
	2,
	"Sully",
	"../pics/The_Paperweight_Peril.jpg"
);

const headphonesOpower = new Book(
	"The Headphones of Power",
	null,
	"theheadphonesofpower",
	"headphonesofpower.html",
	1,
	"Sully",
	"../pics/The_Headphones_of_Power.jpg"
);

const allBooks = [placeholder, paperweightperil, headphonesOpower];
let curBooks = allBooks;

function searchval(string, target) {
	if (target.length <= 0) {
		return 0;
	}
	let start = 0;
	let max = 0;
	let cur = 0;
	for(let i = 0; i < string.length; i++) {
		if (string.charAt(i) === target.charAt(cur)) {
			if (i - start + 1 > max) {
				max = i - start + 1;
			}
			cur++;
			if (cur >= target.length) {
				start = i + 1;
				cur = 0;
			}			
		} else if (string.charAt(i) === target.charAt(0)) {
			cur = 1;
			start = i;
			if (i - start > max) {
				max = i - start;
			}
		} else {
			start = i + 1;
			cur = 0;
		}
	}
	return max;
}



function search() {
	let input = document.getElementById("search").value.toLowerCase();
	let array = [];
	for (let i = 0; i < allBooks.length; i++) {
		array.push([allBooks[i], searchval(allBooks[i].name.toLowerCase(), input)]);
	}
	console.log(array);
	while (true) {
		let swapped = false;
		for (let i = 0; i < array.length - 1; i++) {
			if (array[i][1] > array[i+1][1]) {
				let temp = array[i + 1];
				array[i + 1] = array[i];
				array[i] = temp;
				swapped = true;
			}
		}
		if (!swapped) {
			break;
		}
	}
	let ans = [];
	for (let i = array.length-1; i >= 0; i--) {
		if (array[i][1] > 0) {
			ans.push(array[i][0]);
		}
	}
	curBooks = ans;
	if (input.length == 0) {
		curBooks = allBooks;
	}
	update();
}



function update() {
	document.getElementById("books").innerHTML = "";
	if (curBooks.length == 0) {
		document.getElementById("books").innerHTML = 
			"<h1>We couldn't find anything. Try another keyword.</h1>";
	} else for (let i = 0; i < curBooks.length; i++) {
		document.getElementById("books").innerHTML += curBooks[i].createHtml;
	}
}
	
//put all books in array










































