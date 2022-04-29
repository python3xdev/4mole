document.getElementById("copyright-year").innerHTML = new Date().getFullYear(); // loading in the current year


// --------- INTRO --------- //
let intro = document.querySelector(".intro")
let logo = document.querySelector(".logo-header")
let = logoSpan = document.querySelectorAll(".logo")

window.addEventListener("DOMContentLoaded", ()=>{

	setTimeout(()=>{

		logoSpan.forEach((span, idx)=>{
			setTimeout(()=>{
				span.classList.add('active');
			}, (idx + 1) * 300)
		})

		setTimeout(()=>{
			logoSpan.forEach((span, idx)=>{
				setTimeout(()=>{
					span.classList.remove('active');
					span.classList.add('fade');
				}, (idx + 1) * 50)
			})
		}, 3000)

		setTimeout(()=>{
			intro.style.top = "-100vh"
		}, 3300)

	})
})

// --------- HOME PAGE --------- //
let home_tab = document.querySelector("#home-tab");
let products_tab = document.querySelector("#products-tab");
let about_tab = document.querySelector("#about-tab");

function switchToHomeTab() {
	$("#content").load("ajax/home.html");
	home_tab.classList.add('active');
	products_tab.classList.remove('active');
	about_tab.classList.remove('active');
	document.title = "Home | 4mole™";
}
function switchToProductsTab() {
	$("#content").load("ajax/products.html", function() {
		switchToGamesTab();
	});
	home_tab.classList.remove('active');
	products_tab.classList.add('active');
	about_tab.classList.remove('active');
	document.title = "Products | 4mole™";
}
function switchToAboutTab() {
	$("#content").load("ajax/about.html");
	home_tab.classList.remove('active');
	products_tab.classList.remove('active');
	about_tab.classList.add('active');
	document.title = "About | 4mole™";
}

// --------- PRODUCTS PAGE --------- //
let software_tab;
let services_tab;
let games_tab;

function getProductsPageTabs() {
	software_tab = document.querySelector("#software-tab");
	services_tab = document.querySelector("#services-tab");
	games_tab = document.querySelector("#games-tab");
}

function switchToGamesTab() {
	$("#products-content").load("ajax/products/games.html", function() {
		getProductsPageTabs();
		software_tab.classList.remove('active');
		services_tab.classList.remove('active');
		games_tab.classList.add('active');
	});
}

function switchToSoftwareTab() {
	$("#products-content").load("ajax/products/software.html", function() {
		getProductsPageTabs();
		software_tab.classList.add('active');
		services_tab.classList.remove('active');
		games_tab.classList.remove('active');
	});
}
function switchToServicesTab() {
	$("#products-content").load("ajax/products/services.html", function() {
		getProductsPageTabs();
		software_tab.classList.remove('active');
		services_tab.classList.add('active');
		games_tab.classList.remove('active');
	});
}

// --------- STAR BACKGROUND --------- //
var canvas = document.getElementById("bgStarCanvas"),
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [], // Array that contains the stars
	FPS = 60, // Frames per second
	x = canvas.width; // Number of stars

// Push stars to array
for (var i = 0; i < x; i++) {
	stars.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		radius: Math.random(),
		vx: Math.floor(Math.random() * 10) - 5,
		vy: Math.floor(Math.random() * 10) - 5
	});
}
// Draw the scene
function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.globalCompositeOperation = "lighter";

	for (var i = 0, x = stars.length; i < x; i++) {
		var s = stars[i];

		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
}
// Update star locations
function update() {
	for (var i = 0, x = stars.length; i < x; i++) {
		var s = stars[i];

		s.x += s.vx / FPS;
		s.y += s.vy / FPS;

		if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
		if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
	}
}
// Update and draw
function tick() {
	draw();
	update();
	requestAnimationFrame(tick);
}
tick();


// --------- OTHER --------- //
switchToHomeTab(); // while Intro is playing the page will load the Home content

// Switching to appropriate tab if needed
var hash = window.location.hash.substr(1);
if (hash == "products") {
	switchToProductsTab();
}
else if (hash == "about") {
	switchToAboutTab();
}
else {
	switchToHomeTab();
}

// hiding .html and everything past it in the URL bar
window.history.pushState(null, "4mole™ Home Page", "/home");
